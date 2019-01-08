package fr.adoptunstage.spring.models;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class Stagiaire extends User {

	@Column(name = "prenom")
	private String prenom;

	@Column(name = "etablissement")
	private String etablissement;
	
	@Column(name = "ville")
	private String ville;

	@Column(name = "codePostal")
	private String codePostal;
	
	@Column(name = "tel")
	private String tel;

	
	

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}


	public String getEtablissement() {
		return etablissement;
	}

	public void setEtablissement(String etablissement) {
		this.etablissement = etablissement;
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

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	
	public Stagiaire() {}

	public Stagiaire(String name, String username, String email, String password, String prenom, String etablissement, String ville, String codePostal, String tel) {
		super(name, username, email, password);
		this.prenom = prenom;
		this.etablissement = etablissement;
		this.ville = ville;
		this.codePostal = codePostal;
		this.tel = tel;
	}

	
}
