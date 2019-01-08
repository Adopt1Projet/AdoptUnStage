package fr.adoptunstage.spring.models;

import javax.persistence.Entity;

@Entity
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
	
//	public HTMLMail(String to) {
//		 this.to = to;
//	    }
//
//	    @Override
//	    public String getSubject() {
//	        return "HTML Email Subject";
//	    }
//
//	    @Override
//	    public String getContent() {
//	        return "<html>" +
//	                    "<body>" +
//	                        "<p>Hello client,</p>" +
//	                        "<p>This an <strong>HTML</strong> email content !</p>" +
//	                    "</body>" +
//	                "</html>";
//	    }
}
