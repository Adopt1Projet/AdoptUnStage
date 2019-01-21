import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Partenaire } from 'src/app/modeles/partenaire';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { PartenaireService } from 'src/app/services/partenaire.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-creer-createur-admin',
  templateUrl: './creer-createur-admin.component.html',
  styleUrls: ['./creer-createur-admin.component.css']
})
export class CreerCreateurAdminComponent implements OnInit {
  public formCreate: FormGroup;
  file: FileList;
  curentFile: File;
  loading = false;
  submitted = false;

  constructor(
    private partenaireService: PartenaireService,
    private _location: Location,
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
  ) { this.formCreate = this.createSignupForm(); }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        siteWeb: [
          null
        ],
        nom: [
          null,
          Validators.compose([Validators.required])
        ],
        description: [
          null,
          Validators.compose([Validators.required])
        ],
      },
    );
  }

  get f() { return this.formCreate.controls; }

  retourPage() {
    this._location.back();
  }

  onChange(event) {
    this.file = event.target.files;
  }

  onSubmit() {
    this.submitted = true;
    if (this.formCreate.invalid) {
      return;
    }
    this.loading = true;
    const createur: Partenaire = this.formCreate.value;
    this.loading = true;
    this.partenaireService.createCreator(createur)
      .pipe(first())
      .subscribe(
        data => {
          if (this.file != undefined) {
            this.curentFile = this.file.item(0);
            this.partenaireService.createFileCreator(createur.nom, this.curentFile)
              .subscribe(
                data2 => {
                  console.log(data2)
                },
                error => {
                  this.alertService.success('Votre logo n\'a pas le bon format mais votre compte a bien été créé, vous venez de recevoir un mail de confirmation. Vous pouvez vous connecter.', true);
                });
          }
          this.alertService
            .success('Vous avez bien créé le compte acteur ' + createur.nom, true);
          this.router.navigate(['../admin/partenaires/accueilpartenaires']);
        },
        error => {
          console.log(error);
          this.loading = false;
        });
  }

  ngOnInit() {
  }
}
