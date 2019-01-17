import { Entreprise } from './entreprise';

export class Offre {
    id: number;
    idEntreprise: number;
    titre: string;
    dateDebut: string;
    dateFin: string;
    description: string;
    rue: string;
    ville: string;
    codePostal: number;
    active: boolean;
    entreprise: Entreprise;

}
