package fr.adoptunstage.spring.services;

import fr.adoptunstage.spring.models.HTMLMail;

public interface MailService {

	public String sendEmail(HTMLMail mail);
}
