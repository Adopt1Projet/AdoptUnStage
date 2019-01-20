package fr.adoptunstage.spring.models;


import javax.persistence.*;

@Entity
@Table(name = "aide")
public class Aide {

    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "titre")
    private String titre;

    @Column(name = "intertitre")
    private String intertitre;

    @Column(name = "texte")
    private String texte;


    public long getId() { return id; }

    public void setId(long id) { this.id = id; }

    public String getTitre() { return titre; }

    public void setTitre(String titre) { this.titre = titre; }

    public String getIntertitre() { return intertitre; }

    public void setIntertitre(String intertitre) { this.intertitre = intertitre; }

    public String getTexte() { return texte; }

    public void setTexte(String texte) { this.texte = texte; }


    public Aide() {
    }

    public Aide(String titre, String intertitre, String texte) {
        this.titre = titre;
        this.intertitre = intertitre;
        this.texte = texte;
    }

    @Override
    public String toString() {
        return "Aide [id=" + id + ", titre=" + titre + ", intertitre="+ intertitre + ", texte=" + texte + "]";
    }

}
