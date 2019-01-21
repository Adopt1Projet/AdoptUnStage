import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Partenaire } from 'src/app/modeles/partenaire';
import { AlertService } from 'src/app/services/alert.service';
import { PartenaireService } from 'src/app/services/partenaire.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from 'src/app/Router/PageBoardEntreprise/confirm/confirm.component';

@Component({
  selector: 'app-entreprises-partenaires-admin',
  templateUrl: './entreprises-partenaires-admin.component.html',
  styleUrls: ['./entreprises-partenaires-admin.component.css']
})
export class EntreprisesPartenairesAdminComponent implements OnInit {
  displayedColumns: string[] = ['logo', 'nom', 'description', 'siteWeb', 'modifier', 'supprimer'];
  public array: any;
  public entreprises: any;
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

  // Fonctions supprimer & modifier du tableau

  deleteEntreprise(i) {
    this.partenaireService.deleteCreator(i)
      .subscribe(
        data => {
          console.log(data)
          this.alertService.success('L\'entreprise a bien été supprimée.', true);
        },
        error => console.log(error));
  }

  showConfirm(i) {
    console.log(i);
    this.SimpleModalService.addModal(ConfirmComponent)
      .subscribe((isConfirmed) => {

        // Get modal result
        this.confirmResult = isConfirmed;
        if (isConfirmed) {
          this.deleteEntreprise(i);
          this.reloadData();
        }
      });
  }

  reloadData() {
    setTimeout(() => {
      this.partenaireService.getAllEntreprises().subscribe
      (data => {
        this.entreprises = new MatTableDataSource<Partenaire[]>(data);
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
