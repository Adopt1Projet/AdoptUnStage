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
  file: FileList;
  curentFile: File;

  constructor(
    private actuService: ActuService,
    private alertService: AlertService,
    private router: Router,
    private fb: FormBuilder,
    private token: TokenStorageService
  ) { }

  get f() { return this.formActu.controls; }

  onChange(event) {
    this.file = event.target.files;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    const actu: Actu = this.formActu.value;
    if (this.formActu.invalid) {
      return;
    }
    this.actuService.createActu(actu)
      .subscribe(data => {
        console.log(data);
        if (this.file != undefined) {
          this.curentFile = this.file.item(0);
          this.actuService.createFileActu(actu.titre, this.curentFile)
            .subscribe(
              data2 => {
                console.log(data2)
              },
              error => {
                this.alertService.success('Votre logo n\'a pas le bon format mais votre compte a bien été créé, vous venez de recevoir un mail de confirmation. Vous pouvez vous connecter.', true);
              });
            }
        this.alertService.success('Votre actu à bien été créée. Vous pouvez la modifier si nécessaire.', true);
        this.router.navigate(['../admin/actus/listeactus']);
      }, error => console.log(error));
    Object.keys(this.formActu.controls).forEach(key => {
      this.formActu.controls[key].setErrors(null)
    });
  }

  ngOnInit() {
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
