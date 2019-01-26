import { Component, OnInit, ViewChild } from '@angular/core';
import { OffreService } from 'src/app/services/offre.service';
import { Offre } from 'src/app/modeles/offre';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-liste-offres',
  templateUrl: './liste-offres.component.html',
  styleUrls: ['./liste-offres.component.css']
})
export class ListeOffresComponent implements OnInit {
  displayedColumns: string[] = ['logo', 'titre', 'secteur', 'ville', 'period', 'detail', 'etat'];
  public array: any;
  public offres: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  confirmResult = null;
  pageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private offreService: OffreService,) { }


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

  reloadData() {
    setTimeout(() => {
      this.offreService.getAllOffres().subscribe
        (data => {
          data.map(offre => {
            offre.raisonSociale = offre.entreprise.raisonSociale;
            offre.period = offre.dateDebut + ` <br/>au <br/>` +  offre.dateFin;
            offre.secteur = offre.entreprise.secteur;
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