package fr.adoptunstage.spring.services;

import fr.adoptunstage.spring.models.HTMLMail;

public interface MailService {

	public String sendEmail(HTMLMail mail);
	public String sendEmailToEntreprise(HTMLMail mail);
	public String sendEmailToStagiaire(HTMLMail mail);
}
