import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AlertService } from 'src/app/services/alert.service';
import { PartenaireService } from 'src/app/services/partenaire.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from 'src/app/Router/PageBoardEntreprise/confirm/confirm.component';
import { Partenaire } from 'src/app/modeles/partenaire';

@Component({
  selector: 'app-acteurs-partenaires-admin',
  templateUrl: './acteurs-partenaires-admin.component.html',
  styleUrls: ['./acteurs-partenaires-admin.component.css']
})
export class ActeursPartenairesAdminComponent implements OnInit {
  displayedColumns: string[] = ['logo', 'nom', 'description', 'siteWeb', 'modifier', 'supprimer'];
  public array: any;
  public acteurs: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  confirmResult = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private alertService: AlertService,
    private partenaireService: PartenaireService,
    private SimpleModalService: SimpleModalService) { }

  // Fonctions pagination & filtre du tableau

  applyFilter(filterValue: string) {
    this.acteurs.filter = filterValue.trim().toLowerCase();
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
    this.partenaireService.deleteActor(i)
      .subscribe(
        data => {
          console.log(data)
          this.alertService.success('L\'acteur a bien été supprimé.', true);
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
      this.partenaireService.getAllActors().subscribe
      (data => {
        this.acteurs = new MatTableDataSource<Partenaire[]>(data);
        setTimeout(() => {
          this.acteurs.paginator = this.paginator;
          this.acteurs.sort = this.sort;
        });
        this.array = data;
        this.totalSize = this.acteurs.length;
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
