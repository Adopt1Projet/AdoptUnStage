import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CollegeService } from 'src/app/services/college.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { College } from 'src/app/modeles/college';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-creer-college-admin',
  templateUrl: './creer-college-admin.component.html',
  styleUrls: ['./creer-college-admin.component.css']
})
export class CreerCollegeAdminComponent implements OnInit {

  public formCollege: FormGroup;
  loading = false;
  submitted = false;

  constructor(private collegeService: CollegeService,
    private alertService: AlertService,
    private router: Router,
    private fb: FormBuilder) {
    this.formCollege = this.createSignupForm();
  }

  createSignupForm(): FormGroup {
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

  get f() { return this.formCollege.controls; }


  onSubmit() {
    this.submitted = true;
    this.loading = true;
    const college: College = this.formCollege.value;

    if (this.formCollege.invalid) {
      return;
    }

    this.collegeService.createCollege(college)
      .pipe(first())
      .subscribe(
        data =>{
          this.alertService.success('Votre collège a bien été ajouté. Vous pouvez modifier ses informations si nécessaire.', true),
          this.router.navigate(['../admin/colleges/listecolleges']);
      },
        error => console.log(error));
  }

  ngOnInit() {

  }

}