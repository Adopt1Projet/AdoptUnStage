import { Component, OnInit } from '@angular/core';
import { CollegeService } from 'src/app/services/college.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modifier-college-admin',
  templateUrl: './modifier-college-admin.component.html',
  styleUrls: ['./modifier-college-admin.component.css']
})
export class ModifierCollegeAdminComponent implements OnInit {
  public formUpdate: FormGroup;
  public college: any;
  private submitForm: boolean = false;
  private submitFormPassword: boolean = false;

  constructor(
    private collegeService: CollegeService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
    this.formUpdate = this.updateSignupForm();

  }


  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.collegeService
      .getCollege(id)
      .subscribe(data => {
        this.college = data;
        this.formUpdate.setValue({
          nom: this.college.nom,
          adresse: this.college.adresse,
          ville: this.college.ville,
          codePostal: this.college.codePostal,
          contactPublic: this.college.contactPublic,
          nomReferent: this.college.nomReferent,
          prenomReferent: this.college.prenomReferent,
          emailReferent: this.college.emailReferent,
          telReferent: this.college.telReferent,
        });
      },
        error => console.log("Une erreur est survenue."));
  }


  updateSignupForm(): FormGroup {
    return this.fb.group(
      {
        nom: [
          '',
          Validators.required
        ],
        adresse: [
          '',
          Validators.required
        ],
        ville: [
          '',
          Validators.required
        ],
        codePostal: [
          '',
          Validators.required
        ],
        contactPublic: [
          '',
          Validators.required
        ],
        nomReferent: [null],
        prenomReferent: [null],
        emailReferent: [null],
        telReferent: [null],
      },
    );
  }

  onSubmit() {
    this.submitForm = true;
    this.collegeService.updateCollege(this.college.id, this.formUpdate.value)
      .subscribe(
        data => {
          this.alertService.success('Vos modifications ont bien été prises en compte !', true);
          this.router.navigate(['../admin/colleges/listecolleges']);
        },
        error => {
          this.alertService.error('Une erreur est servenue. L\'email renseigné est peut-être déjà utilisé.', true);
        });

    document.body.scrollTop = 230; // For Safari
    document.documentElement.scrollTop = 230; // For Chrome, Firefox, IE and Opera

  }
}
