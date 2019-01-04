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
	private int codePostal;
	
	@Column(name = "tel")
	private int tel;

	
	

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

	public int getCodePostal() {
		return codePostal;
	}

	public void setCodePostal(int codePostal) {
		this.codePostal = codePostal;
	}

	public int getTel() {
		return tel;
	}

	public void setTel(int tel) {
		this.tel = tel;
	}

	
	public Stagiaire() {}

	public Stagiaire(String name, String username, String email, String password, String prenom, String etablissement, String ville, int codePostal, int tel) {
		super(name, username, email, password);
		this.prenom = prenom;
		this.etablissement = etablissement;
		this.ville = ville;
		this.codePostal = codePostal;
		this.tel = tel;
	}

	
}
