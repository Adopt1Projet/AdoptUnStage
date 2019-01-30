package fr.adoptunstage.spring.models;

public class SignupMail{
	
	private String to;
	private String prenom;
	private String email;
	
	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
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
	
public SignupMail() {};
	
	public SignupMail(
				

				String prenom,
				String email) {
								

									this.prenom = prenom;
									this.email = email;
								}
	
	public SignupMail(
			String to,
			String prenom,
			String email) {
								this.to = to;
								this.prenom = prenom;
								this.email = email;
							}

	
	@Override
	public String toString() {
		return "[" + ", Prenom=" + prenom + ", Email="
				+ email + "]";
	}
	
	public String signupEntreprise() {
		String str = "<html>" +
                "<body>" +
					"<h4><b>Merci pour votre inscription " + this.prenom +"!</b></h4>" +
					"<hr>" +
					"<p>Bienvenue sur Adopt'un stage. Pour vous identifier lors de vos visites sur notre site, cliquez sur " +
					"<a href=\"http://vps641460.ovh.net/connexion\">Connexion</a>," +
					"<br>puis saisissez le mail et le mot de passe renseignés lors de votre inscription.</p>" +
					"<br><br>" +
					"<p>Identifiant d'inscription : " + this.email +
					"<br><br>" +
					"<p>En vous connectant à votre compte, vous pourrez :</p>" +
					"<ol> "
					+ "<li>Voir la liste des offres et leur détail.</li>"
					+ "<li>Créer et modifier vos offres.</li>"
					+ "<li>Gérer vos candidatures et recruter des stagiaires.</li>"
					+ "<li>Modifier les informations de votre entreprise.</li>"
					+ "<li>Modifier les identifiants et mot de passe de votre compte.</li>"
					+ "</ol>" +
					"<p>Si vous avez des questions au sujet de votre compte ou autre, n'hésitez pas à nous contacter"
					+ "<br>par notre formulaire de contact disponible <a href=\"http://vps641460.ovh.net/contact\">ici</a>."
					+ "<br><p>Merci,</p><p>l'équipe Adopt'un stage.</p>" + 
                "</body>" +
          "</html>";
//					String.format("Mail : %s , \n Prenom %s , Nom %s \n Message : \n %s" , this.email , this.prenom , this.name , this.message);
		return str;
	}
	
	public String signupStagiaire() {
		String str = "<html>" +
                "<body>" +
					"<h4><b>Merci pour ton inscription " + this.prenom +"!</b></h4>" +
					"<hr>" +
					"<p>Bienvenue sur Adopt'un stage. Pour t'identifier lors de tes visites sur notre site, clique sur " +
					"<a href=\"http://vps641460.ovh.net/connexion\">Connexion</a>," +
					"<br>puis saisis le mail et le mot de passe renseignés lors de ton inscription.</p>" +
					"<br><br>" +
					"<p>Identifiant d'inscription : " + this.email +
					"<br><br>" +
					"<p>En te connectant à ton compte, tu pourras :</p>" +
					"<ol> "
					+ "<li>Voir la liste des offres et leur détail.</li>"
					+ "<li>Postuler à une offre.</li>"
					+ "<li>Voir la liste des offres auxquels tu as envoyé une candidature.</li>"
					+ "<li>Modifier tes informations personnelles.</li>"
					+ "<li>Modifier tes identifiants et le mot de passe de ton compte.</li>"
					+ "</ol>" +
					"<p>Si tu as des questions au sujet de ton compte ou autre, n'hésite pas à nous contacter"
					+ "<br>par notre formulaire de contact disponible <a href=\"http://vps641460.ovh.net/contact\">ici</a>."
					+ "<br><p>Merci,</p><p>l'équipe Adopt'un stage.</p>" + 
                "</body>" +
          "</html>";
		return str;
	}
}
