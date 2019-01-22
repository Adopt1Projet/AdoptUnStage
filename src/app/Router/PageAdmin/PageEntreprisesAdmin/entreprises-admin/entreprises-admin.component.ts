import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AlertService } from 'src/app/services/alert.service';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from 'src/app/Router/PageBoardEntreprise/confirm/confirm.component';
import { Entreprise } from 'src/app/modeles/entreprise';

@Component({
  selector: 'app-entreprises-admin',
  templateUrl: './entreprises-admin.component.html',
  styleUrls: ['./entreprises-admin.component.css']
})
export class EntreprisesAdminComponent implements OnInit {
  displayedColumns: string[] = ['logo', 'raisonSociale', 'referent', 'email', 'tel', 'adresse', 'offres', 'modifier', 'supprimer'];
  public array: any;
  public entreprises: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  confirmResult = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private alertService: AlertService,
    private entrepriseService: EntrepriseService,
    private SimpleModalService: SimpleModalService) { }

  // Fonctions pagination & filtre du tableau

  applyFilter(filterValue: string) {
    this.entreprises.filter = filterValue.trim().toLowerCase();
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
    this.entrepriseService.deleteUser(i)
      .subscribe(
        data => {
          this.alertService.success('Le compte a bien été supprimé.', true);
        },
        error => console.log(error));
  }

  showConfirm(i) {
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
      this.entrepriseService.getEntrepriseList().subscribe
      (data => {
        this.entreprises = new MatTableDataSource<Entreprise[]>(data);
        setTimeout(() => {
          this.entreprises.paginator = this.paginator;
          this.entreprises.sort = this.sort;
        });
        this.array = data;
        this.totalSize = this.entreprises.length;
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
