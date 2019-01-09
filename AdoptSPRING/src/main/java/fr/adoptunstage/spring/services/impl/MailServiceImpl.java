package fr.adoptunstage.spring.services.impl;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import fr.adoptunstage.spring.models.HTMLMail;
import fr.adoptunstage.spring.services.MailService;

@Service
public class MailServiceImpl implements MailService {
	
	@Autowired
	private JavaMailSender mailSender;
		
	private final static String EMAIL_ADMIN = "kevin.radlowski@gmail.com";
	
	@Override
	public String sendEmail(HTMLMail mail) {

		try {
	        MimeMessage message = mailSender.createMimeMessage();
	        
	        MimeMessageHelper helper = new MimeMessageHelper(message);
	        
	        helper.setTo(EMAIL_ADMIN);
	        helper.setSubject(mail.getTitle());
	        helper.setText(mail.buildMyMessage());
			
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
