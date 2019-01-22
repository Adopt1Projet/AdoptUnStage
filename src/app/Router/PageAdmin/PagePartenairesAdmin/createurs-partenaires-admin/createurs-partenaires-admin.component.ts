import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { AlertService } from 'src/app/services/alert.service';
import { PartenaireService } from 'src/app/services/partenaire.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from 'src/app/Router/PageBoardEntreprise/confirm/confirm.component';
import { Partenaire } from 'src/app/modeles/partenaire';

@Component({
  selector: 'app-createurs-partenaires-admin',
  templateUrl: './createurs-partenaires-admin.component.html',
  styleUrls: ['./createurs-partenaires-admin.component.css']
})
export class CreateursPartenairesAdminComponent implements OnInit {
  displayedColumns: string[] = ['logo', 'nom', 'description', 'siteWeb', 'modifier', 'supprimer'];
  public array: any;
  public createurs: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  confirmResult = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private alertService: AlertService,
    private partenaireService: PartenaireService,
    private SimpleModalService: SimpleModalService) { }

  // Fonctions pagination & filtre du tableau

  applyFilter(filterValue: string) {
    this.createurs.filter = filterValue.trim().toLowerCase();
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

  deleteCreator(i) {
    this.partenaireService.deleteCreator(i)
      .subscribe(
        data => {
          this.alertService.success('Le créateur a bien été supprimé.', true);
        },
        error => console.log(error));
  }

  showConfirm(i) {
    this.SimpleModalService.addModal(ConfirmComponent)
      .subscribe((isConfirmed) => {

        // Get modal result
        this.confirmResult = isConfirmed;
        if (isConfirmed) {
          this.deleteCreator(i);
          this.reloadData();
        }
      });
  }

  reloadData() {
    setTimeout(() => {
      this.partenaireService.getAllCreators().subscribe
      (data => {
        this.createurs = new MatTableDataSource<Partenaire[]>(data);
        setTimeout(() => {
          this.createurs.paginator = this.paginator;
          this.createurs.sort = this.sort;
        });
        this.array = data;
        this.totalSize = this.createurs.length;
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