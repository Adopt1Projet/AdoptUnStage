import { Component, OnInit, ViewChild } from '@angular/core';
import { ActuService } from 'src/app/services/actu.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Actu } from 'src/app/modeles/actu';

@Component({
  selector: 'app-actu-dashboard',
  templateUrl: './actu-dashboard.component.html',
  styleUrls: ['./actu-dashboard.component.css']
})
export class ActuDashboardComponent implements OnInit {
  displayedColumns: string[] = ['image', 'titre', 'exergue'];
  public array: any;
  public actus: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  isMobile;
  pageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private entrepriseService: ActuService) { }

  applyFilter(filterValue: string) {
    this.actus.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.entrepriseService.getActusList().subscribe
      (data => {
        this.actus = new MatTableDataSource<Actu[]>(data);
        setTimeout(() => {
          this.actus.paginator = this.paginator;
          this.actus.sort = this.sort;
        });
        this.array = data;
        this.totalSize = this.actus.length;
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
