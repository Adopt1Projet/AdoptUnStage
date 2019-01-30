import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../../auth/token-storage.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AideService } from '../../../../services/aide.service';
import { Aide } from '../../../../modeles/aide';

@Component({
  selector: 'app-creer-aide-admin',
  templateUrl: './creer-aide-admin.component.html',
  styleUrls: ['./creer-aide-admin.component.css']
})
export class CreerAideAdminComponent implements OnInit {
  username: string;
  public formAide: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private aideService: AideService,
    private alertService: AlertService,
    private router: Router,
    private fb: FormBuilder,
    private token: TokenStorageService
  ) {}

  get f() {
    return this.formAide.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    const aide: Aide = this.formAide.value;

    if (this.formAide.invalid) {
      return;
    }
    this.router.navigate(['../admin/aide/listeaide']);
    this.aideService.createAide(this.username, aide).subscribe(
      data => {
        this.alertService.success(
          "Votre nouveau texte d'aide à bien été créée. Vous pouvez le modifier si nécessaire.",
          true
        );
      },
      error => console.log(error)
    );
    Object.keys(this.formAide.controls).forEach(key => {
      this.formAide.controls[key].setErrors(null);
    });
  }

  ngOnInit() {
    this.username = this.token.getUsername();
    this.formAide = this.fb.group({
      titre: [''],
      intertitre: [''],
      texte: [''],
      lien: ['']
    });
  }
}
