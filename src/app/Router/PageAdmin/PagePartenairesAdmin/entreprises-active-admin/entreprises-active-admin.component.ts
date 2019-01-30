import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { Entreprise } from 'src/app/modeles/entreprise';

@Component({
  selector: 'app-entreprises-active-admin',
  templateUrl: './entreprises-active-admin.component.html',
  styleUrls: ['./entreprises-active-admin.component.css']
})
export class EntreprisesActiveAdminComponent implements OnInit {
  displayedColumns: string[] = ['logo', 'nom', 'description', 'siteWeb'];
  public array: any;
  public entreprises: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  confirmResult = null;
  pageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private entrepriseService: EntrepriseService) { }

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

  reloadData() {
    setTimeout(() => {
      this.entrepriseService.getEntreprisesActives()
      .subscribe(data => {
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
