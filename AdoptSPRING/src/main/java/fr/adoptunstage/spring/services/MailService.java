package fr.adoptunstage.spring.services;

import fr.adoptunstage.spring.models.EntrepriseMail;
import fr.adoptunstage.spring.models.HTMLMail;
import fr.adoptunstage.spring.models.SignupMail;
import fr.adoptunstage.spring.payload.UploadFileResponse;

public interface MailService {

	public String sendEmail(HTMLMail mail);
	public String sendEmailToEntreprise(EntrepriseMail mail, UploadFileResponse CV);
	public String sendEmailToStagiaire(HTMLMail mail);
	public String signupEntrepriseMail(SignupMail mail);
	public String signupStagiaireMail(SignupMail mail);
}
