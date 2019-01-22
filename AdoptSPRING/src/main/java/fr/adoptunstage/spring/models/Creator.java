package fr.adoptunstage.spring.models;

import javax.persistence.*;

import fr.adoptunstage.spring.payload.UploadFileResponse;

@Entity
@Table(name = "partenaire_createurs")
public class Creator {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "nom")
	private String nom;

	@Column(name = "description")
	private String description;

	@Column(name = "site_web")
	private String siteWeb;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "upload_id")
	private UploadFileResponse logo;

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

	public String getSiteWeb() {
		return siteWeb;
	}

	public void setSiteWeb(String siteWeb) {
		this.siteWeb = siteWeb;
	}	

	public UploadFileResponse getLogo() {
		return logo;
	}

	public void setLogo(UploadFileResponse logo) {
		this.logo = logo;
	}

	public Creator() {}

	public Creator(String nom, String description, String siteWeb) {
		super();
		this.nom = nom;
		this.description = description;
		this.siteWeb = siteWeb;
		this.logo = new UploadFileResponse (null, null, null, 0);
	}

	@Override
	public String toString() {
		return "Acteur [id=" + id + ", nom=" + nom + ", description=" + description + ", siteWeb=" + siteWeb
				+ ", logo=" + logo + "]";
	}

}
