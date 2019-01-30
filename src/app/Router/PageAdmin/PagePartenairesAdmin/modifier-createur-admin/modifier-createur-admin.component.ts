import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PartenaireService } from 'src/app/services/partenaire.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modifier-createur-admin',
  templateUrl: './modifier-createur-admin.component.html',
  styleUrls: ['./modifier-createur-admin.component.css']
})
export class ModifierCreateurAdminComponent implements OnInit {

  public formUpdate: FormGroup;
  file: FileList;
  curentFile: File;
  public createur: any;
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
      .getCreator(id)
      .subscribe(data => {
        this.createur = data;
        this.formUpdate.setValue({
          nom: this.createur.nom,
          description: this.createur.description,
          siteWeb: this.createur.siteWeb,
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
    this.partenaireService.updateCreator(this.createur.id, this.formUpdate.value)
      .subscribe(
        data => {
          if (this.file != undefined) {
            this.curentFile = this.file.item(0);
            this.partenaireService.createFileCreator(this.formUpdate.value.nom, this.curentFile)
              .subscribe(
                data2 => {
                  this.alertService.success('Votre logo et vos autres modifications ont bien été prises en compte !', true);
                },
                error => {
                  this.alertService.error('Votre logo n\'a pas le bon format mais vos autres modifications ont bien été prises en compte !', true);
                });;
          }
          this.alertService.success('Vos modifications ont bien été prises en compte !', true);
          this.router.navigate(['../admin/partenaires/createurs/listecreateurs']);
        },
        error => {
          this.alertService.error('Une erreur est servenue. L\'email renseigné est peut-être déjà utilisé.', true);
        });

    document.body.scrollTop = 230; // For Safari
    document.documentElement.scrollTop = 230; // For Chrome, Firefox, IE and Opera

  }
}
