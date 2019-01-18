
import { Component, OnInit, ViewChild } from '@angular/core';
import { Offre } from 'src/app/modeles/offre';
import { OffreService } from 'src/app/services/offre.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({

  selector: 'app-offres-accueil',
  templateUrl: './offres-accueil.component.html',
  styleUrls: ['./offres-accueil.component.css']

})
export class OffresAccueilComponent implements OnInit {
  displayedColumns: string[] = ['titre', 'secteur', 'raisonSociale', 'statut', 'period', 'ville', 'codePostal', 'details'];
  public array: any;
  public offres: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private offreService: OffreService) { }

  applyFilter(filterValue: string) {
    this.offres.filter = filterValue.trim().toLowerCase();
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
            offre.period = offre.dateDebut + ` <br/>au <br/>` + offre.dateFin;
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