package fr.adoptunstage.spring.message.request;

public class AideRequest {

    private String titre;

    private String intertitre;

    private String texte;

    public String getTitre() { return titre; }

    public void setTitre(String titre) { this.titre = titre; }

    public String getIntertitre() { return intertitre; }

    public void setIntertitre(String intertitre) { this.intertitre = intertitre; }

    public String getTexte() { return texte; }

    public void setTexte(String texte) { this.texte = texte; }
}
