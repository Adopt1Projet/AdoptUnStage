import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Stagiaire } from 'src/app/modeles/stagiaire';
import { StagiaireService } from 'src/app/services/stagiaire.service';

@Component({
  selector: 'app-stagiaires-dashboard',
  templateUrl: './stagiaires-dashboard.component.html',
  styleUrls: ['./stagiaires-dashboard.component.css']
})
export class StagiairesDashboardComponent implements OnInit {
  displayedColumns: string[] = ['civilite', 'name', 'etablissement'];
  public array: any;
  public stagiaires: any;
  stagiaire: Stagiaire;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  confirmResult = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private stagiaireService: StagiaireService) { }

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
