import { Component, OnInit, Input } from '@angular/core';
import { Offre } from 'src/app/modeles/offre';
import { OffreService } from 'src/app/services/offre.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-modifier-offre',
  templateUrl: './modifier-offre.component.html',
  styleUrls: ['./modifier-offre.component.css']
})
export class ModifierOffreComponent implements OnInit {

  @Input() formData: any = [];
  offre: Offre;

  formOffre = new FormGroup({
    id: new FormControl(),
    titre: new FormControl(),
    description: new FormControl(),
    dateDebut: new FormControl(),
    dateFin: new FormControl(),
    rue: new FormControl(),
    ville: new FormControl(),
    codePostal: new FormControl(),
  });
  constructor(private offreService: OffreService) { }

  onSubmit() {
    this.offre = this.formOffre.value;
    this.offreService.updateOffre(this.offre.id, this.offre)
      //   // this.formData.id, { titre: this.formData.titre, description: this.formData.description, rue: this.formData.rue, ville: this.formData.ville, codePostal: this.formData.codePostal }
      //  )
      .subscribe(data => console.log(this.formOffre.value), error => console.log(error));

  }
  deleteOffre(id) {
    this.offreService.deleteOffre(id)
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error));
  }

  ngOnInit() {
    this.offre = this.formOffre.value;
  }

}
// (this.offre.id,
//   { titre: this.offre.titre, description: this.offre.description, rue: this.offre.rue, ville: this.offre.ville, codePostal: this.offre.codePostal })

