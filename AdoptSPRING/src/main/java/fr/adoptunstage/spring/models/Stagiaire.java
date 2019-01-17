package fr.adoptunstage.spring.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import fr.adoptunstage.spring.payload.UploadFileResponse;

@Entity
public class Stagiaire extends User {

	@Column(name = "civilite")
	private String civilite;

	@Column(name = "prenom")
	private String prenom;

	@Column(name = "etablissement")
	private String etablissement;
	
	@Column(name = "ville")
	private String ville;

	@Column(name = "codePostal")
	private String codePostal;
	
	@ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                CascadeType.PERSIST,
                CascadeType.MERGE
            },
            mappedBy = "stagiaires")
	@JsonIgnore
    private Set<Offre> offres; 
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "upload_id")
	private UploadFileResponse CV;
	
	
	
	
	public UploadFileResponse getCV() {
		return CV;
	}

	public void setCV(UploadFileResponse CV) {
		this.CV = CV;
	}

	public Set<Offre> getOffresNonPourvues() {
		Set<Offre> offresActives = new HashSet<Offre>();
		for(Offre offre : offres) {
			if (offre.isActive()) {
			offresActives.add(offre);
			}
		}
		return offresActives;
	}
	
	public Set<Offre> getOffresPourvues() {
		Set<Offre> offresNonActives = new HashSet<Offre>();
		for(Offre offre : offres) {
			if (offre.isActive() == false) {
			offresNonActives.add(offre);
			}
		}
		return offresNonActives;
	}

	public Set<Offre> getOffres() {
		return offres;
	}

	public void setOffres(Set<Offre> offres) {
		this.offres = offres;
	}
	
	public void setOffre(Offre offre) {
		this.offres.add(offre);
	}


	public String getCivilite() {
		return civilite;
	}

	public void setCivilite(String civilite) {
		this.civilite = civilite;
	}


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

	
	public Stagiaire() {}

	public Stagiaire(String name, String username, String email, String password, String civilite, String prenom, String etablissement, String ville, String codePostal) {
		super(name, username, email, password);
		this.civilite = civilite;
		this.prenom = prenom;
		this.etablissement = etablissement;
		this.ville = ville;
		this.codePostal = codePostal;
		this.CV = new UploadFileResponse (null, null, null, 0);
		this.offres = new HashSet<Offre>();
	}

	
}
