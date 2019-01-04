package fr.adoptunstage.spring.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "offres")
public class Offre {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "titre")
	private String titre;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "rue")
	private String rue;
	
	@Column(name = "ville")
	private String ville;
	
	@Column(name = "codePostal")
	private int codePostal;
	
	@Column(name ="active")
	private boolean active;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitre() {
		return titre;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getRue() {
		return rue;
	}

	public void setRue(String rue) {
		this.rue = rue;
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
	
	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	
	public Offre() {};
	
	public Offre(
				String titre, 
				String description, 
				String rue, 
				String ville, 
				int codePostal,
				boolean active) {
									super();
									this.titre = titre;
									this.description = description;
									this.rue = rue;
									this.ville = ville;
									this.codePostal = codePostal;
									this.active = false;
								}

	
	@Override
	public String toString() {
		return "Offre [id=" + id + ", titre=" + titre + ", description=" + description + ", rue=" + rue + ", ville="
				+ ville + ", codePostal=" + codePostal + ", active=" + active + "]";
	}

	
}
