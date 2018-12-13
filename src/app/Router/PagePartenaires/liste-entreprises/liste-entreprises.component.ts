import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-entreprises',
  templateUrl: './liste-entreprises.component.html',
  styleUrls: ['./liste-entreprises.component.css']
})
export class ListeEntreprisesComponent implements OnInit {

  partenaires = [
    {
      nom: "Burger King",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo provident omnis nostrum blanditiis ab incidunt architecto inventore voluptatibus at. Numquam doloremque iure pariatur adipisci atque quidem delectus recusandae quibusdam tempora.",
      logo: "https://statewideguttercompany.com/wp-content/uploads/2012/07/logo-placeholder.jpg"
    },
    {
      nom: "Mac Donald's",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo provident omnis nostrum blanditiis ab incidunt architecto inventore voluptatibus at. Numquam doloremque iure pariatur adipisci atque quidem delectus recusandae quibusdam tempora.",
      logo: "https://statewideguttercompany.com/wp-content/uploads/2012/07/logo-placeholder.jpg"
    },
    {
      nom: "Pizza Hut",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo provident omnis nostrum blanditiis ab incidunt architecto inventore voluptatibus at. Numquam doloremque iure pariatur adipisci atque quidem delectus recusandae quibusdam tempora.",
      logo: "https://statewideguttercompany.com/wp-content/uploads/2012/07/logo-placeholder.jpg"
    },
    {
      nom: "Taco Bell",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo provident omnis nostrum blanditiis ab incidunt architecto inventore voluptatibus at. Numquam doloremque iure pariatur adipisci atque quidem delectus recusandae quibusdam tempora.",
      logo: "https://statewideguttercompany.com/wp-content/uploads/2012/07/logo-placeholder.jpg"
    },
    {
      nom: "Le Camion Qui Fume",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo provident omnis nostrum blanditiis ab incidunt architecto inventore voluptatibus at. Numquam doloremque iure pariatur adipisci atque quidem delectus recusandae quibusdam tempora.",
      logo: "https://statewideguttercompany.com/wp-content/uploads/2012/07/logo-placeholder.jpg"
    },
    {
      nom: "Pomme de pain",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo provident omnis nostrum blanditiis ab incidunt architecto inventore voluptatibus at. Numquam doloremque iure pariatur adipisci atque quidem delectus recusandae quibusdam tempora.",
      logo: "https://statewideguttercompany.com/wp-content/uploads/2012/07/logo-placeholder.jpg"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
