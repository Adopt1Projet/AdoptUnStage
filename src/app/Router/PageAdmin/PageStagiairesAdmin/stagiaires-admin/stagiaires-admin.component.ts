import { Component, OnInit, ViewChild } from '@angular/core';
import { Stagiaire } from 'src/app/modeles/stagiaire';
import { StagiaireService } from 'src/app/services/stagiaire.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from 'src/app/Router/PageBoardEntreprise/confirm/confirm.component';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-stagiaires-admin',
  templateUrl: './stagiaires-admin.component.html',
  styleUrls: ['./stagiaires-admin.component.css']
})
export class StagiairesAdminComponent implements OnInit {
  displayedColumns: string[] = ['civilite', 'name', 'prenom', 'email', 'etablissement', 'ville', 'codePostal', 'candidatures', 'modifier', 'supprimer'];
  public array: any;
  public stagiaires: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  confirmResult = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private alertService: AlertService,
    private stagiaireService: StagiaireService,
    private SimpleModalService: SimpleModalService) { }

  // Fonctions pagination & filtre du tableau

  applyFilter(filterValue: string) {
    this.stagiaires.filter = filterValue.trim().toLowerCase();
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.array = part;
  }

  // Fonctions supprimer & modifier du tableau

  deleteStagiaire(i) {
    this.stagiaireService.deleteUser(i)
      .subscribe(
        data => {
          console.log(data)
          this.alertService.success('Le compte a bien été supprimé.', true);
        },
        error => console.log(error));
  }

  showConfirm(i) {
    console.log(i);
    this.SimpleModalService.addModal(ConfirmComponent)
      .subscribe((isConfirmed) => {

        // Get modal result
        this.confirmResult = isConfirmed;
        if (isConfirmed) {
          this.deleteStagiaire(i);
          this.reloadData();
        }
      });
  }

  reloadData() {
    setTimeout(() => {
      this.stagiaireService.getStagiaireList().subscribe
      (data => {
        this.stagiaires = new MatTableDataSource<Stagiaire[]>(data);
        setTimeout(() => {
          this.stagiaires.paginator = this.paginator;
          this.stagiaires.sort = this.sort;
        });
        this.array = data;
        this.totalSize = this.stagiaires.length;
        this.iterator();
      });
    }, 100);
  }

  ngOnInit() {
    this.reloadData();
  }

  ngOnChanges() {
    this.reloadData();
  }
}