package fr.adoptunstage.spring.services.impl;

import java.io.File;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Transport;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import fr.adoptunstage.spring.models.EntrepriseMail;
import fr.adoptunstage.spring.models.HTMLMail;
import fr.adoptunstage.spring.services.MailService;
import fr.adoptunstage.spring.models.SignupMail;
import fr.adoptunstage.spring.models.StagiaireMail;
import fr.adoptunstage.spring.payload.UploadFileResponse;

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
	
	public String sendEmailToEntreprise(EntrepriseMail mail, UploadFileResponse CV) {

		try {
			
	        MimeMessage message = mailSender.createMimeMessage();
	        
	        MimeMessageHelper helper = new MimeMessageHelper(message, false, "utf-8");
	        
	        helper.setTo(mail.getTo());
	        helper.setSubject(mail.getTitle());
	        
	        File file = new File("uploads/" + CV.getFileName());
	        FileDataSource datasource1 = new FileDataSource(file);
	        DataHandler handler1 = new DataHandler(datasource1);
	        MimeBodyPart fichierJoint = new MimeBodyPart();
	        try {
	        	fichierJoint.setDataHandler(handler1);
	        	fichierJoint.setFileName(datasource1.getName());
	        } catch (MessagingException e) {
	            e.printStackTrace();
	        }
	        
	        MimeBodyPart content = new MimeBodyPart();
	        try {
	            content.setContent(mail.buildMyMessage(), "text/html; charset=utf-8");
	        } catch (MessagingException e) {
	            e.printStackTrace();
	        }
	        
	        MimeMultipart mimeMultipart = new MimeMultipart();
	        
	        try {
	        	mimeMultipart.addBodyPart(content);
	            mimeMultipart.addBodyPart(fichierJoint);
	        } catch (MessagingException e) {
	            e.printStackTrace();
	        }
	        
	        message.setContent(mimeMultipart);
	        
	        
	        mailSender.send(message);
		} 
		catch(MessagingException e) {
			System.err.println("Impossible d'envoyer le mail");
			e.printStackTrace();
			return "ko";
		}

		return "ok";
    }
	
	public String sendEmailToStagiaire(StagiaireMail mail) {
		
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
