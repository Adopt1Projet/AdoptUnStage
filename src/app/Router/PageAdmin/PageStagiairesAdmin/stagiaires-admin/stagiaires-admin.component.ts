import { Component, OnInit, ViewChild } from '@angular/core';
import { Stagiaire } from 'src/app/modeles/stagiaire';
import { StagiaireService } from 'src/app/services/stagiaire.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-stagiaires-admin',
  templateUrl: './stagiaires-admin.component.html',
  styleUrls: ['./stagiaires-admin.component.css']
})
export class StagiairesAdminComponent implements OnInit {
  displayedColumns: string[] = ['civilite', 'name', 'prenom', 'email', 'etablissement', 'ville', 'codePostal', 'modifier', 'supprimer'];
  public array: any;
  public stagiaires: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private stagiaireService: StagiaireService) { }

  applyFilter(filterValue: string) {
    this.stagiaires.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
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