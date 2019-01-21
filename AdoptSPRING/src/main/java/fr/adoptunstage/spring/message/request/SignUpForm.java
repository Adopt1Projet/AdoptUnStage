package fr.adoptunstage.spring.message.request;

import java.util.Set;

import javax.validation.constraints.*;

import fr.adoptunstage.spring.payload.UploadFileResponse;

public class SignUpForm {
	@NotBlank
	private String name;

	@NotBlank
	@Size(min = 3, max = 50)
	private String username;

	@NotBlank
	@Size(max = 60)
	@Email
	private String email;

	private String contactMail;

	private Set<String> role;

	@NotBlank
	@Size(min = 6, max = 40)
	private String password;

	private String raisonSociale;

	private String secteur;

	private String statut;

	private String adresse;

	private String ville;

	private String codePostal;

	private UploadFileResponse logo;

	private String civilite;

	private String prenom;

	private String description;

	private String tel;

	private String siteWeb;

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

	public UploadFileResponse getLogo() {
		return logo;
	}

	public void setLogo(UploadFileResponse logo) {
		this.logo = logo;
	}

	public String getCivilite() { return civilite; }

	public void setCivilite(String civilite) { this.civilite = civilite; }

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getContactMail() {
		return contactMail;
	}

	public String getDescription() {
		return description;
	}

	public void setContactMail(String contactMail) {
		this.contactMail = contactMail;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getSiteWeb() {
		return siteWeb;
	}

	public void setSiteWeb(String siteWeb) {
		this.siteWeb = siteWeb;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<String> getRole() {
		return this.role;
	}

	public void setRole(Set<String> role) {
		this.role = role;
	}
}