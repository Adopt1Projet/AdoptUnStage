import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PartenaireService } from 'src/app/services/partenaire.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modifier-acteur-admin',
  templateUrl: './modifier-acteur-admin.component.html',
  styleUrls: ['./modifier-acteur-admin.component.css']
})
export class ModifierActeurAdminComponent implements OnInit {

  public formUpdate: FormGroup;
  file: FileList;
  curentFile: File;
  public acteur: any;
  private submitForm: boolean = false;
  private submitFormPassword: boolean = false;

  constructor(
    private partenaireService: PartenaireService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
    this.formUpdate = this.updateSignupForm();

  }


  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.partenaireService
      .getActor(id)
      .subscribe(data => {
        this.acteur = data;
        this.formUpdate.setValue({
          nom: this.acteur.nom,
          description: this.acteur.description,
          siteWeb: this.acteur.siteWeb,
        });
      },
        error => console.log("Une erreur est survenue."));
  }


  updateSignupForm(): FormGroup {
    return this.fb.group(
      {
        description: [
          null,
          Validators.compose([Validators.required])
        ],
        nom: [
          null,
          Validators.compose([Validators.required])
        ],
        siteWeb: [null],
      },
    );
  }

  onChange(event) {
    this.file = event.target.files;
  }

  onSubmit() {
    this.submitForm = true;
    this.partenaireService.updateActor(this.acteur.id, this.formUpdate.value)
      .subscribe(
        data => {
          if (this.file != undefined) {
            this.curentFile = this.file.item(0);
            this.partenaireService.createFileActor(this.formUpdate.value.nom, this.curentFile)
              .subscribe(
                data2 => {
                  this.alertService.success('Votre logo et vos autres modifications ont bien été prises en compte !', true);
                },
                error => {
                  this.alertService.error('Votre logo n\'a pas le bon format mais vos autres modifications ont bien été prises en compte !', true);
                });;
          }
          this.alertService.success('Vos modifications ont bien été prises en compte !', true);
          this.router.navigate(['../admin/partenaires/acteurs/listeacteurs']);
        },
        error => {
          this.alertService.error('Une erreur est servenue. L\'email renseigné est peut-être déjà utilisé.', true);
        });

    document.body.scrollTop = 230; // For Safari
    document.documentElement.scrollTop = 230; // For Chrome, Firefox, IE and Opera

  }
}
