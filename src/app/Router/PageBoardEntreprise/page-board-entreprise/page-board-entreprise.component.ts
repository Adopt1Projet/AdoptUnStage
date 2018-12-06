import { Component, OnInit } from '@angular/core';

export type EditorType = 'creerOffre' | 'gestionOffres' | 'infosEntreprise';

@Component({
  selector: 'app-page-board-entreprise',
  templateUrl: './page-board-entreprise.component.html',
  styleUrls: ['./page-board-entreprise.component.css']
})
export class PageBoardEntrepriseComponent implements OnInit {

  editor: EditorType = 'creerOffre';

  get showFormulaireCreerOffreEditor() {
    return this.editor === 'creerOffre';
  }

  get showGestionOffresEditor() {
    return this.editor === 'gestionOffres';
  }
  get showInfosEntrepriseEditor() {
    return this.editor === 'infosEntreprise';
  }

  toggleEditor(type: EditorType) {
    this.editor = type;
  }

  constructor() { }

  ngOnInit() {
  }

}
