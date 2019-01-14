package fr.adoptunstage.spring.services.impl;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import fr.adoptunstage.spring.models.HTMLMail;
import fr.adoptunstage.spring.services.MailService;
import fr.adoptunstage.spring.models.SignupMail;

@Service
public class MailServiceImpl implements MailService {
	
	@Autowired
	private JavaMailSender mailSender;
		
	private final static String EMAIL_ADMIN = "adoptunstage@gmail.com";
	
	@Override
	public String sendEmail(HTMLMail mail) {

		try {
	        MimeMessage message = mailSender.createMimeMessage();
	        
	        MimeMessageHelper helper = new MimeMessageHelper(message, false, "utf-8");
	        
	        helper.setTo(EMAIL_ADMIN);
	        helper.setSubject(mail.getTitle());
	        message.setContent(mail.buildMyMessage(), "text/html; charset=utf-8");
			
	        mailSender.send(message);
		} 
		catch(MessagingException e) {
			System.err.println("Impossible d'envoyer le mail");
			e.printStackTrace();
			return "ko";
		}

		return "ok";
    }
	
	public String sendEmailToEntreprise(HTMLMail mail) {

		try {
	        MimeMessage message = mailSender.createMimeMessage();
	        
	        MimeMessageHelper helper = new MimeMessageHelper(message, false, "utf-8");
	        
	        helper.setTo(mail.getTo());
	        helper.setSubject(mail.getTitle());
	        message.setContent(mail.buildMyMessage(), "text/html; charset=utf-8");
			
	        mailSender.send(message);
		} 
		catch(MessagingException e) {
			System.err.println("Impossible d'envoyer le mail");
			e.printStackTrace();
			return "ko";
		}

		return "ok";
    }
	
	public String sendEmailToStagiaire(HTMLMail mail) {
		
		String titre = "Reponse automatique de candidature sur Adoptunstage.fr";

		try {
	        MimeMessage message = mailSender.createMimeMessage();
	        
	        MimeMessageHelper helper = new MimeMessageHelper(message, false, "utf-8");
	        
	        helper.setTo(mail.getTo());
	        helper.setSubject(titre);
	        message.setContent(mail.buildMyMessage(), "text/html; charset=utf-8");
			
	        mailSender.send(message);
		} 
		catch(MessagingException e) {
			System.err.println("Impossible d'envoyer le mail");
			e.printStackTrace();
			return "ko";
		}

		return "ok";
    }
	
	public String signupEntrepriseMail(SignupMail mail) {
		
		String titre = "Bienvenue sur Adoptunstage.fr !";
		
		try {MimeMessage message = mailSender.createMimeMessage();
        
        MimeMessageHelper helper = new MimeMessageHelper(message, false, "utf-8");
        
        helper.setTo(mail.getTo());
        helper.setSubject(titre);
        message.setContent(mail.signupEntreprise(), "text/html; charset=utf-8");
		
        mailSender.send(message);
	} 
	catch(MessagingException e) {
		System.err.println("Impossible d'envoyer le mail");
		e.printStackTrace();
		return "ko";
	}

	return "ok";
	}
	
public String signupStagiaireMail(SignupMail mail) {
		
		String titre = "Bienvenue sur Adoptunstage.fr !";
		
		try {MimeMessage message = mailSender.createMimeMessage();
        
        MimeMessageHelper helper = new MimeMessageHelper(message, false, "utf-8");
        
        helper.setTo(mail.getTo());
        helper.setSubject(titre);
        message.setContent(mail.signupStagiaire(), "text/html; charset=utf-8");
		
        mailSender.send(message);
	} 
	catch(MessagingException e) {
		System.err.println("Impossible d'envoyer le mail");
		e.printStackTrace();
		return "ko";
	}

	return "ok";
	}
}
