import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AlertService } from 'src/app/services/alert.service';
import { CollegeService } from 'src/app/services/college.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from 'src/app/Router/PageBoardEntreprise/confirm/confirm.component';
import { College } from 'src/app/modeles/college';

@Component({
  selector: 'app-colleges-admin',
  templateUrl: './colleges-admin.component.html',
  styleUrls: ['./colleges-admin.component.css']
})
export class CollegesAdminComponent implements OnInit {
  displayedColumns: string[] = [
    'nom',
    'adresse',
    'contactPublic',
    'nomReferent',
    'telReferent',
    'modifier',
    'supprimer'
  ];
  public array: any;
  public colleges: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  confirmResult = null;
  pageEvent;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private alertService: AlertService,
    private collegeService: CollegeService,
    private SimpleModalService: SimpleModalService
  ) {}

  // Fonctions pagination & filtre du tableau

  applyFilter(filterValue: string) {
    this.colleges.filter = filterValue.trim().toLowerCase();
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

  deleteCollege(i) {
    this.collegeService.deleteCollege(i).subscribe(
      data => {
        this.alertService.success('Le collège a bien été supprimé.', true);
      },
      error => console.log(error)
    );
  }

  showConfirm(i) {
    this.SimpleModalService.addModal(ConfirmComponent).subscribe(
      isConfirmed => {
        // Get modal result
        this.confirmResult = isConfirmed;
        if (isConfirmed) {
          this.deleteCollege(i);
          this.reloadData();
        }
      }
    );
  }

  reloadData() {
    setTimeout(() => {
      this.collegeService.getCollegesList().subscribe(data => {
        this.colleges = new MatTableDataSource<College[]>(data);
        setTimeout(() => {
          this.colleges.paginator = this.paginator;
          this.colleges.sort = this.sort;
        });
        this.array = data;
        this.totalSize = this.colleges.length;
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
