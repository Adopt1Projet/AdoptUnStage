package fr.adoptunstage.spring.models;

import javax.persistence.Entity;

public class HTMLMail{
	
	private String to;
	private String title;
	private String message;
	private String prenom;
	private String name;
	private String email;
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}
	
public HTMLMail() {};
	
	public HTMLMail(
				
				String title, 
				String message, 
				String prenom, 
				String name, 
				String email) {
									
									this.title = title;
									this.message = message;
									this.prenom = prenom;
									this.name = name;
									this.email = email;
								}

	
	@Override
	public String toString() {
		return "[Titre=" + title + ", Message=" + message + ", Prenom=" + prenom + ", Nom=" + name + ", Email="
				+ email + "]";
	}
	
	public String buildMyMessage() {
		String str = "<html>" +
		                "<body>" +
							
							"<p><span style=\"color: #2ed1bb; font-weight: bolder;\">Mail:</span> " + this.email + "</p>" +
							"<p><span style=\"color: #2ed1bb; font-weight: bolder;\">Nom:</span> " + this.name + "</p>" +
		                    "<p><span style=\"color: #2ed1bb; font-weight: bolder;\">Prénom:</span> " + this.prenom + "</p>" +
		                    "<p><span style=\"color: #2ed1bb; font-weight: bolder;\">Message :</span></p>" + this.message +
		                    "<img src=\"../../../../../../../../src/assets/img/banner.png\" class=\"img-fluid w-100\" alt=\"\">" +
		                "</body>" +
		              "</html>";
//					String.format("Mail : %s , \n Prenom %s , Nom %s \n Message : \n %s" , this.email , this.prenom , this.name , this.message);
		return str;
	}
}
