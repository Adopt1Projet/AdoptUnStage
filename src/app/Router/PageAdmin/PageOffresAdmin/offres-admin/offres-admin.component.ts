import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { OffreService } from 'src/app/services/offre.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ConfirmComponent } from 'src/app/Router/PageBoardEntreprise/confirm/confirm.component';
import { Offre } from 'src/app/modeles/offre';

@Component({
  selector: 'app-offres-admin',
  templateUrl: './offres-admin.component.html',
  styleUrls: ['./offres-admin.component.css']
})
export class OffresAdminComponent implements OnInit {
  displayedColumns: string[] = ['titre', 'raisonSociale', 'ville', 'period', 'postulants', 'detail', 'modifier', 'supprimer'];
  public array: any;
  public offres: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  confirmResult = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private alertService: AlertService,
    private offreService: OffreService,
    private SimpleModalService: SimpleModalService) { }

  // Fonctions pagination & filtre du tableau

  applyFilter(filterValue: string) {
    this.offres.filter = filterValue.trim().toLowerCase();
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

  deleteOffre(i) {
    this.offreService.deleteOffre(i)
      .subscribe(
        data => {
          this.alertService.success('L\'offre a bien été supprimé.', true);
        },
        error => console.log(error));
  }

  showConfirm(i) {
    this.SimpleModalService.addModal(ConfirmComponent)
      .subscribe((isConfirmed) => {

        // Get modal result
        this.confirmResult = isConfirmed;
        if (isConfirmed) {
          this.deleteOffre(i);
          this.reloadData();
        }
      });
  }

  reloadData() {
    setTimeout(() => {
      this.offreService.getAllOffres().subscribe
        (data => {
          data.map(offre => {
            offre.raisonSociale = offre.entreprise.raisonSociale;
            offre.period = offre.dateDebut + ` <br/>au <br/>` +  offre.dateFin;
          })

          this.offres = new MatTableDataSource<Offre[]>(data);
          setTimeout(() => {
            this.offres.paginator = this.paginator;
            this.offres.sort = this.sort;
          });

          this.array = data;
          this.totalSize = this.offres.length;
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
