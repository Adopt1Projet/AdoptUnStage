package fr.adoptunstage.spring.models;

public class EntrepriseMail {
	
	private String to;
	private String title;
	private String message;
	private String prenom;
	private String name;
	private String email;

	public EntrepriseMail(String to,
			String title, 
			String message, 
			String prenom, 
			String name, 
			String email) {
		 
							this.to = to;
							this.title = title;
							this.message = message;
							this.prenom = prenom;
							this.name = name;
							this.email = email;
						
	}
	
	
	
	
	public String getTo() {
		return to;
	}




	public void setTo(String to) {
		this.to = to;
	}




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




	public String buildMyMessage() {
		String str = "<html>" +
			                "<body>" +
			                	"<p>Bonjour,</p>" +
			                	"<p><span style=\"color: #2ed1bb; font-weight: bolder;\">" + this.prenom + " " + this.name + "</span>" + " vient de postuler à votre annonce pour un stage de 3ème sur le site Adopt'Un Stage.</p>" +
			                	"<p>Vous pourrez lui répondre par mail : " + "<span style=\"color: #2ed1bb; font-weight: bolder;\">" + this.email + "</span>.</p>" +
			                	"<p>" + this.prenom + " vous a laissé un message, ainsi que son CV en pièce jointe.</p>" +
			                    "<p><span style=\"color: #2ed1bb; font-weight: bolder;\">Message :</span></p>" + this.message +
			                    "<br />" +
			                    "<br />" +
			                    "<p><span style=\"color: #2ed1bb; font-weight: bolder;\">Cordialement,</span></p>" +
			                    "<p><span style=\"color: #2ed1bb; font-weight: bolder;\">L'équipe Adop'Un Stage.</span></p>" +
			                "</body>" +
		              "</html>";
		
//					String.format("Mail : %s , \n Prenom %s , Nom %s \n Message : \n %s" , this.email , this.prenom , this.name , this.message);
		return str;
	}

}
