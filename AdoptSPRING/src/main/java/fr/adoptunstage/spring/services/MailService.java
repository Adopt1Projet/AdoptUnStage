package fr.adoptunstage.spring.services;

import fr.adoptunstage.spring.models.HTMLMail;
import fr.adoptunstage.spring.models.SignupMail;

public interface MailService {

	public String sendEmail(HTMLMail mail);
	public String sendEmailToEntreprise(HTMLMail mail);
	public String sendEmailToStagiaire(HTMLMail mail);
	public String signupEntrepriseMail(SignupMail mail);
	public String signupStagiaireMail(SignupMail mail);
}
