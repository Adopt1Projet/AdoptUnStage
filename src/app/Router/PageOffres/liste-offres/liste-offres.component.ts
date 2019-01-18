import { Component, OnInit, ViewChild } from '@angular/core';
import { OffreService } from 'src/app/services/offre.service';
import { Observable } from 'rxjs';
import { Offre } from 'src/app/modeles/offre';
import * as moment from 'moment';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-liste-offres',
  templateUrl: './liste-offres.component.html',
  styleUrls: ['./liste-offres.component.css']
})
export class ListeOffresComponent implements OnInit {
  displayedColumns: string[] = ['logo', 'secteur', 'titre', 'ville', 'period', 'active', 'details'];
  public array: any;
  public offres: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // offres: Offre[];
  // page: number;
  // taillePage: number;

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
//   ngOnInit() {

//     this.offreService.getAllOffres().subscribe
//       (data => { this.offres = data;
//                  this.offres.sort((offre, offre2) => offre2.id - offre.id);
//                   for (let i = 0; i < this.offres.length; i++) {
//                     this.offres[i].dateDebut = moment(this.offres[i].dateDebut).format("DD/MM/YYYY");
//                     this.offres[i].dateFin = moment(this.offres[i].dateFin).format("DD/MM/YYYY");
//                 }
//       });
//   }

//   increasePage() {
//     this.page++;
//   }

//   decreasePage() {
//     this.page--;
//   }

//   getPage() {
//     const debut = this.page*this.taillePage;
//     const fin = Number(this.taillePage) + Number(this.page*this.taillePage);
//     return this.offres.slice(debut,fin);
//   }
// }