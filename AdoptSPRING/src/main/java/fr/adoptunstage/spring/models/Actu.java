package fr.adoptunstage.spring.models;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import fr.adoptunstage.spring.payload.UploadFileResponse;

@Entity
@Table(name = "actus")
public class Actu {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "titre")
	private String titre;

	@Column(name = "exergue")
	private String exergue;

	@Column(name = "legende_image")
	private String legendeImage;

	@Column(name = "paragraphe_1")
	private String paragraphe1;

	@Column(name = "intertitre_1")
	private String intertitre1;

	@Column(name = "paragraphe_2")
	private String paragraphe2;

	@Column(name = "intertitre_2")
	private String intertitre2;

	@Column(name = "paragraphe_3")
	private String paragraphe3;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "upload_id")
	private UploadFileResponse logo;

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

	public String getExergue() {
		return exergue;
	}

	public void setExergue(String exergue) {
		this.exergue = exergue;
	}

	public String getIntertitre1() {
		return intertitre1;
	}

	public void setIntertitre1(String intertitre1) {
		this.intertitre1 = intertitre1;
	}

	public String getIntertitre2() {
		return intertitre2;
	}

	public void setIntertitre2(String intertitre2) {
		this.intertitre2 = intertitre2;
	}

	public String getParagraphe1() {
		return paragraphe1;
	}

	public void setParagraphe1(String paragraphe1) {
		this.paragraphe1 = paragraphe1;
	}

	public String getParagraphe2() {
		return paragraphe2;
	}

	public void setParagraphe2(String paragraphe2) {
		this.paragraphe2 = paragraphe2;
	}

	public String getParagraphe3() {
		return paragraphe3;
	}

	public void setParagraphe3(String paragraphe3) {
		this.paragraphe3 = paragraphe3;
	}

	public UploadFileResponse getLogo() {
		return logo;
	}

	public void setLogo(UploadFileResponse logo) {
		this.logo = logo;
	}

	public String getLegendeImage() {
		return legendeImage;
	}

	public void setLegendeImage(String legendeImage) {
		this.legendeImage = legendeImage;
	}

	public Actu() {
	}

	public Actu(String titre, String exergue, String image, String legendeImage, String paragraphe1, String intertitre1,
			String paragraphe2, String intertitre2, String paragraphe3) {
		this.titre = titre;
		this.exergue = exergue;
		this.legendeImage = legendeImage;
		this.paragraphe1 = paragraphe1;
		this.intertitre1 = intertitre1;
		this.paragraphe2 = paragraphe2;
		this.intertitre2 = intertitre2;
		this.paragraphe3 = paragraphe3;
		this.logo = new UploadFileResponse(null, null, null, 0);

	}

	@Override
	public String toString() {
		return "Actu [id=" + id + ", titre=" + titre + ", exergue=" + exergue + ", legendeImage=" + legendeImage
				+ ", intertitre1=" + ", paragraphe1=" + paragraphe1 + intertitre1 + ", paragraphe2=" + paragraphe2
				+ ", intertitre2=" + intertitre2 + ", paragraphe3=" + paragraphe3 + ", logo=" + logo + "]";
	}

}