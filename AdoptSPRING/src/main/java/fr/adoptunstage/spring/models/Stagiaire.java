package fr.adoptunstage.spring.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "stagiaires")
public class Stagiaire {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "prenom")
	private String prenom;
	
	@Column(name = "nom")
	private String nom;

	@Column(name = "etablissement")
	private String etablissement;
	
	@Column(name = "ville")
	private String ville;

	@Column(name = "codePostal")
	private int codePostal;
	
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
	
	public Stagiaire() {}

	public Stagiaire(String prenom, String nom, String etablissement, String ville, int codePostal, int tel, String mail,
			String mdp) {
		
		this.prenom = prenom;
		this.nom = nom;
		this.etablissement = etablissement;
		this.ville = ville;
		this.codePostal = codePostal;
		this.tel = tel;
		this.mail = mail;
		this.mdp = mdp;
	}

	@Override
	public String toString() {
		return "Customer [id=" + id + ", prenom=" + prenom + ", nom=" + nom + ", etablissement=" + etablissement
				+ ", ville=" + ville + ", codePostal=" + codePostal + ", tel=" + tel + ", mail=" + mail + ", mdp=" + mdp
				+ "]";
	}
	
}
