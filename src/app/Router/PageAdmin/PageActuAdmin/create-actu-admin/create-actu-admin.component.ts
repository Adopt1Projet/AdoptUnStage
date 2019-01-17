import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Actu } from 'src/app/modeles/actu';
import { ActuService } from 'src/app/services/actu.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-create-actu-admin',
  templateUrl: './create-actu-admin.component.html',
  styleUrls: ['./create-actu-admin.component.css']
})
export class CreateActuAdminComponent implements OnInit {
  username: string;
  public formActu: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private actuService: ActuService,
    private alertService: AlertService,
    private router: Router,
    private fb: FormBuilder,
    private token: TokenStorageService
  ) { }

  get f() { return this.formActu.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    const actu: Actu = this.formActu.value;

    if (this.formActu.invalid) {
      return;
    }
    this.router.navigate(['../admin/actus/listeactus']);
    this.actuService.createActu(this.username, actu)
      .subscribe(data => {
        console.log(data),
        this.alertService.success('Votre actu à bien été créée. Vous pouvez la modifier si nécessaire.', true);
      }, error => console.log(error));
    Object.keys(this.formActu.controls).forEach(key => {
      this.formActu.controls[key].setErrors(null)
    });
  }

  ngOnInit() {
    this.username = this.token.getUsername();
    this.formActu = this.fb.group({
      titre: [
        '',
        Validators.required
      ],
      exergue: [
        '',
        Validators.required
      ],
      image: [
        '',
      ],
      legendeImage: [
        '',
      ],
      paragraphe1: [
        '',
        Validators.required
      ],
      intertitre1: [
        '',
      ],
      paragraphe2: [
        '',
      ],
      intertitre2: '',
      paragraphe3: '',
    })
  }

}
