package fr.adoptunstage.spring.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "partenaires")
public class Partenaire {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "nom")
	private String nom;
	
	@Column(name = "description")
	private String description;

	@Column(name = "logo")
	private String logo;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public Partenaire() {}
	
	public Partenaire(String nom, String description, String logo) {
		super();
		this.nom = nom;
		this.description = description;
		this.logo = logo;
	}

	@Override
	public String toString() {
		return "Partenaire [id=" + id + ", nom=" + nom + ", description=" + description + ", logo=" + logo + "]";
	}	
}