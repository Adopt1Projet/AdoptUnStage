import { Component, OnInit } from '@angular/core';
import { ActuService } from 'src/app/services/actu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modifier-actu-admin',
  templateUrl: './modifier-actu-admin.component.html',
  styleUrls: ['./modifier-actu-admin.component.css']
})
export class ModifierActuAdminComponent implements OnInit {
  id: number;
  public formActu: FormGroup;
  public actu: any;
  file: FileList;
  curentFile: File;
  private submitForm: boolean = false;
  loading = false;


  constructor(
    private actuService: ActuService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { this.formActu = this.updateActuForm() }

  onSubmit() {

    this.loading = true;
    // const actu: Actu = this.formActu.value;
    // if (this.formActu.invalid) {
    //   return;
    // }
    this.submitForm = true;
    /*  if (this.formActu.value.titre == null) { this.formActu.value.titre = this.actu.titre };
     *  if (this.formActu.value.description == null) { this.formActu.value.description = this.actu.description };
     *  if (this.formActu.value.rue == null) { this.formActu.value.rue = this.actu.rue };
     *  if (this.formActu.value.ville == null) { this.formActu.value.ville = this.actu.ville };
     *  if (this.formActu.value.codePostal == null) { this.formActu.value.codePostal = this.actu.codePostal };
     *  if (this.formActu.value.dateDebut == null) { this.formActu.value.dateDebut = this.actu.dateDebut };
     *  if (this.formActu.value.dateFin == null) { this.formActu.value.dateFin = this.actu.dateFin }; */
    this.actuService.updateActu(this.actu.id, this.formActu.value)
      .subscribe(
        data => {
          if (this.file != undefined) {
            this.curentFile = this.file.item(0);
            this.actuService.createFileActu(this.formActu.value.titre, this.curentFile)
              .subscribe(
                data2 => {
                  this.alertService.success('Votre logo et vos autres modifications ont bien été prises en compte !', true);
                },
                error => {
                  this.alertService.error('Votre logo n\'a pas le bon format mais vos autres modifications ont bien été prises en compte !', true);
                });;
          }
          this.alertService.success('Vos modifications ont bien été prises en compte !', true);
        },
        error => {
          this.alertService.error('Une erreur est servenue. Veuillez vérifier les informations entrées.', true);
        });
    this.router.navigate(['../admin/actus/listeactus']);
  }

  retourPage() {
    this.location.back();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
    })
    this.actuService
      .getActu(this.id)
      .subscribe(data => {
        this.actu = data;
        this.formActu.setValue({
          titre: this.actu.titre,
          exergue: this.actu.exergue,
          legendeImage: this.actu.legendeImage,
          paragraphe1 : this.actu.paragraphe1,
          intertitre1: this.actu.intertitre1,
          paragraphe2: this.actu.paragraphe2,
          intertitre2: this.actu.intertitre2,
          paragraphe3: this.actu.paragraphe3
        });
      },
        error => console.log("Une erreur est survenue."));
  }

  onChange(event) {
    this.file = event.target.files;
  }

  updateActuForm(): FormGroup {
    return this.fb.group(
      {
    titre: [
      '',
      Validators.required
    ],
    exergue: [
      '',
      Validators.required
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
