package fr.adoptunstage.spring.message.request;

public class SignUpFormCollege {

	private String nom;

	private String adresse;

	private String ville;

	private String codePostal;

	private String contactPublic;

	private String nomReferent;

	private String prenomReferent;

	private String emailReferent;

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

	public void setCodePostal(String codePostal) {
		this.codePostal = codePostal;
	}

	public String getContactPublic() {
		return contactPublic;
	}

	public void setContactPublic(String contactPublic) {
		this.contactPublic = contactPublic;
	}

	public String getNomReferent() {
		return nomReferent;
	}

	public void setNomReferent(String nomReferent) {
		this.nomReferent = nomReferent;
	}

	public String getPrenomReferent() {
		return prenomReferent;
	}

	public void setPrenomReferent(String prenomReferent) {
		this.prenomReferent = prenomReferent;
	}

	public String getEmailReferent() {
		return emailReferent;
	}

	public void setEmailReferent(String emailReferent) {
		this.emailReferent = emailReferent;
	}

	public String getTelReferent() {
		return telReferent;
	}

	public void setTelReferent(String telReferent) {
		this.telReferent = telReferent;
	}
}