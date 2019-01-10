package fr.adoptunstage.spring.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "offres")
public class Offre {
	
	

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@ManyToOne
    @JoinColumn(name="id_entreprise")
    private Entreprise entreprise;
	
	@ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                CascadeType.PERSIST,
                CascadeType.MERGE
            })
    @JoinTable(name = "candidatures",
            joinColumns = { @JoinColumn(name = "id_offre") },
            inverseJoinColumns = { @JoinColumn(name = "id_stagiaire") })
	@JsonIgnore
    private Set<Stagiaire> stagiaires; 

	@Column(name = "titre")
	private String titre;
	
	@Column(name = "description")
	private String description;
	
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
	
	public Set<Stagiaire> getStagiaires() {
		return stagiaires;
	}

	public void setStagiaires(Set<Stagiaire> stagiaires) {
		this.stagiaires = stagiaires;
	}
	
	public void setStagiaire(Stagiaire stagiaire) {
		this.stagiaires.add(stagiaire);
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
				String rue, 
				String ville, 
				String codePostal,
				boolean active) {
									this.entreprise = entreprise;
									this.titre = titre;
									this.description = description;
									this.rue = rue;
									this.ville = ville;
									this.codePostal = codePostal;
									this.active = active;
									this.stagiaires = new HashSet<Stagiaire>(); 
								}

	
	@Override
	public String toString() {
		return "Offre [id=" + id + ", id_entreprise=" +  ", titre=" + titre + ", description="
				+ description + ", rue=" + rue + ", ville=" + ville + ", codePostal=" + codePostal + ", active="
				+ active + "]";
	}

	
}
