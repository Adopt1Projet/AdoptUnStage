package fr.adoptunstage.spring.models;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Entreprise extends User {

	@Column(name = "raison_sociale")
	private String raisonSociale;

	@Column(name = "secteur")
	private String secteur;

	@Column(name = "statut")
	private String statut;

	@Column(name = "adresse")
	private String adresse;

	@Column(name = "ville")
	private String ville;

	@Column(name = "codePostal")
	private String codePostal;

	@Column(name = "logo") // TODO : Modifier en File dès que l'on aura appris comment faire.
	private String logo;

	@Column(name = "prenom")
	private String prenom;

	@Column(name = "description")
	private String description;

	@Column(name = "tel")
	private String tel;

	@Column(name = "siteWeb")
	private String siteWeb;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "entreprise")
	@JsonIgnore
	private Set<Offre> offres;

	public Set<Offre> getOffres() {
		return offres;
	}

	public void setOffres(Set<Offre> offres) {
		this.offres = offres;
	}

	public void setOffre(Offre offre) {
		this.offres.add(offre);
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

	public String getCodePostal() {
		return codePostal;
	}

	public void setCodePostal(String codePostal) {
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

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Entreprise() {
	}

	public Entreprise(String name, String username, String email, String password, String raisonSociale, String secteur,
			String statut, String siteWeb, String adresse, String ville, String codePostal, String logo, String prenom,
			String description, String tel) {
		super(name, username, email, password);
		this.raisonSociale = raisonSociale;
		this.secteur = secteur;
		this.statut = statut;
		this.adresse = adresse;
		this.ville = ville;
		this.codePostal = codePostal;
		this.logo = logo;
		this.prenom = prenom;
		this.description = description;
		this.tel = tel;
		this.siteWeb = siteWeb;
		this.offres = new HashSet<Offre>();

	}

}
