package fr.adoptunstage.spring.models;

import javax.persistence.*;


@Entity
@Table(name = "offres")
public class Offre {
	
	

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@ManyToOne
    @JoinColumn(name="id_entreprise")
    private Entreprise entreprise; 


	@Column(name = "titre")
	private String titre;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "dateDebut")
	private String dateDebut;
	

	@Column(name = "dateFin")
	private String dateFin;
	
	@Column(name = "rue")
	private String rue;
	
	@Column(name = "ville")
	private String ville;
	
	@Column(name = "codePostal")
	private String codePostal;
	
	@Column(name ="active")
	private boolean active;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}


	public Entreprise getEntreprise() {
		return entreprise;
	}

	public void setEntreprise(Entreprise entreprise) {
		this.entreprise = entreprise;
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
	
	public String getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(String dateDebut) {
		this.dateDebut = dateDebut;
	}
	
	public String getDateFin() {
		return dateFin;
	}

	public void setDateFin(String dateFin) {
		this.dateFin = dateFin;
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

	public String getCodePostal() {
		return codePostal;
	}

	public void setCodePostal(String codePostal) {
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
				Entreprise entreprise,
				String titre, 
				String description, 
				String dateDebut,
				String dateFin,
				String rue, 
				String ville, 
				String codePostal,
				boolean active) {
									this.entreprise = entreprise;
									this.titre = titre;
									this.description = description;
									this.dateDebut = dateDebut;
									this.dateFin = dateFin;
									this.rue = rue;
									this.ville = ville;
									this.codePostal = codePostal;
									this.active = active;
								}

	
	@Override
	public String toString() {
		return "Offre [id=" + id + ", entreprise=" + entreprise + ", titre=" + titre + ", description=" + description
				+ ", dateDebut=" + dateDebut + ", dateFin=" + dateFin + ", rue=" + rue + ", ville=" + ville
				+ ", codePostal=" + codePostal + ", active=" + active + "]";
	}

	
}
