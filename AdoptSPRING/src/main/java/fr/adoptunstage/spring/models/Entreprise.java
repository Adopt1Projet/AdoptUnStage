package fr.adoptunstage.spring.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "entreprises")
public class Entreprise {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "raison_sociale")
	private String raisonSociale;
	
	@Column(name = "secteur")
	private String secteur;
	
	@Column(name = "statut")
	private String statut;
	
	@Column(name = "siteWeb")
	private String siteWeb;
	
	@Column(name = "adresse")
	private String adresse;
	
	@Column(name = "ville")
	private String ville;
	
	@Column(name = "codePostal")
	private int codePostal;
	
	@Column(name = "logo") // TODO : Modifier en File dès que l'on aura appris comment faire.
	private String logo;
	
	@Column(name = "prenom")
	private String prenom;
	
	@Column(name = "nom")
	private String nom;
	
	@Column(name = "fonction")
	private String fonction;
	
	@Column(name = "tel")
	private int tel;
	
	@Column(name = "mail")
	private String mail;
	
	@Column(name = "mdp")
	private String mdp;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getRaisonSociale() {
		return raisonSociale;
	}

	public void setRaisonSociale(String raisonSociale) {
		this.raisonSociale = raisonSociale;
	}

	public String getSecteur() {
		return secteur;
	}

	public void setSecteur(String secteur) {
		this.secteur = secteur;
	}

	public String getStatut() {
		return statut;
	}

	public void setStatut(String statut) {
		this.statut = statut;
	}

	public String getSiteWeb() {
		return siteWeb;
	}

	public void setSiteWeb(String siteWeb) {
		this.siteWeb = siteWeb;
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

	public int getCodePostal() {
		return codePostal;
	}

	public void setCodePostal(int codePostal) {
		this.codePostal = codePostal;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getFonction() {
		return fonction;
	}

	public void setFonction(String fonction) {
		this.fonction = fonction;
	}

	public int getTel() {
		return tel;
	}

	public void setTel(int tel) {
		this.tel = tel;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getMdp() {
		return mdp;
	}

	public void setMdp(String mdp) {
		this.mdp = mdp;
	}
	
	public Entreprise () {}
	
	public Entreprise(String raisonSociale, String secteur, String statut, String siteWeb, String adresse, String ville,
			int codePostal, String logo, String prenom, String nom, String fonction, int tel, String mail, String mdp) {
		super();
		this.raisonSociale = raisonSociale;
		this.secteur = secteur;
		this.statut = statut;
		this.siteWeb = siteWeb;
		this.adresse = adresse;
		this.ville = ville;
		this.codePostal = codePostal;
		this.logo = logo;
		this.prenom = prenom;
		this.nom = nom;
		this.fonction = fonction;
		this.tel = tel;
		this.mail = mail;
		this.mdp = mdp;
	}

	@Override
	public String toString() {
		return "Entreprise [id=" + id + ", raisonSociale=" + raisonSociale + ", secteur=" + secteur + ", statut="
				+ statut + ", siteWeb=" + siteWeb + ", adresse=" + adresse + ", ville=" + ville + ", codePostal="
				+ codePostal + ", logo=" + logo + ", prenom=" + prenom + ", nom=" + nom + ", fonction=" + fonction
				+ ", tel=" + tel + ", mail=" + mail + ", mdp=" + mdp + "]";
	}
}
