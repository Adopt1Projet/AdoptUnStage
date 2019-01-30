package fr.adoptunstage.spring.models;



public class StagiaireMail {
		
	private String to;
	private String title;
	private String message;
	private String prenom;
	private String entrepriseName;
	
	public StagiaireMail(String to,
			String title, 
			String message, 
			String prenom,  
			String entrepriseName) {	 
							this.to = to;
							this.title = "Adopt'Un Stage : " + title;
							this.message = message;
							this.prenom = prenom;
							this.entrepriseName = entrepriseName;	
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




	public String getEntrepriseName() {
		return entrepriseName;
	}




	public void setEntrepriseName(String entrepriseName) {
		this.entrepriseName = entrepriseName;
	}




	public String buildMyMessage() {
		String str = "<html>" +
			                "<body>" +
			                	"<p>Bonjour <span style=\"color: #2ed1bb; font-weight: bolder;\">" + this.prenom + ",</span></p>" +
			                	"<p>Tu as bien envoyé ta candidature à <span style=\"color: #2ed1bb; font-weight: bolder;\">" + this.entrepriseName + ".</span></p>" +
			                	"<p>Ton message :</p>" +  
			                	"<p>" + this.message + "</p>" +
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