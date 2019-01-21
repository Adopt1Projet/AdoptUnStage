package fr.adoptunstage.spring.models;


import javax.persistence.*;

@Entity
@Table(name = "colleges")
public class College {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "ville")
    private String ville;

    @Column(name = "codePostal")
    private String codePostal;

    @Column(name = "contactPublic")
    private String contactPublic;

    @Column(name = "nomReferent")
    private String nomReferent;

    @Column(name = "prenomReferent")
    private String prenomReferent;

    @Column(name = "emailReferent")
    private String emailReferent;

    @Column(name = "telReferent")
    private String telReferent;


    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getCodePostal() {
        return codePostal;
    }

    public void setCodePostal(String codePostal) { this.codePostal = codePostal; }

    public String getContactPublic() { return contactPublic; }

    public void setContactPublic(String contactPublic) { this.contactPublic = contactPublic; }

    public String getNomReferent() { return nomReferent; }

    public void setNomReferent(String nomReferent) { this.nomReferent = nomReferent; }

    public String getPrenomReferent() { return prenomReferent; }

    public void setPrenomReferent(String prenomReferent) { this.prenomReferent = prenomReferent; }

    public String getEmailReferent() { return emailReferent; }

    public void setEmailReferent(String emailReferent) { this.emailReferent = emailReferent; }

    public String getTelReferent() { return telReferent; }

    public void setTelReferent(String telReferent) { this.telReferent = telReferent; }


    public College() {};

    /*public College(String nom, String adresse, String ville,
                   String codePostal, String contactPublic,
                   String nomReferent, String prenomReferent, String emailReferent, String telReferent) {
        this.nom = nom;
        this.adresse = adresse;
        this.ville = ville;
        this.codePostal = codePostal;
        this.contactPublic = contactPublic;
        this.nomReferent = nomReferent;
        this.prenomReferent = prenomReferent;
        this.emailReferent = emailReferent;
        this.telReferent = telReferent;

    }*/

}
