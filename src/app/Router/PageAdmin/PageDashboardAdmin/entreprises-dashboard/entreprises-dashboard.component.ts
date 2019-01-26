import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { Entreprise } from 'src/app/modeles/entreprise';

@Component({
  selector: 'app-entreprises-dashboard',
  templateUrl: './entreprises-dashboard.component.html',
  styleUrls: ['./entreprises-dashboard.component.css']
})
export class EntreprisesDashboardComponent implements OnInit {
  displayedColumns: string[] = ['logo', 'raisonSociale'];
  public array: any;
  public entreprises: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  isMobile;
  pageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private entrepriseService: EntrepriseService) { }

  applyFilter(filterValue: string) {
    this.entreprises.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
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
}
