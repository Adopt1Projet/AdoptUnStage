package fr.adoptunstage.spring.services;

import fr.adoptunstage.spring.models.HTMLMail;
import fr.adoptunstage.spring.models.Offre;
import fr.adoptunstage.spring.repos.MailRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class MailService {
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired 
	MailRepository repository;
	
	public HTMLMail sendEmail(@RequestBody HTMLMail mail) throws MessagingException {

//        MimeMessage message = mailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message, false, "utf-8");
//
//        helper.setTo("kevin.radlowski@gmail.com");
//        helper.setTitle(mail.getTitle());
//        message.setMessage(mail.getMessage());
//        message.setPrenom(mail.getPrenom());
//        message.setName(mail.getName());
//        message.setEmail(mail.getEmail());
		
		HTMLMail _mail = repository.save(new HTMLMail(mail.getTitle(), mail.getMessage(), mail.getPrenom(),
				mail.getName(), mail.getEmail()));
		System.out.println("Nouveau message = " + _mail.toString());
		return _mail;
        
        mailSender.send(message);
    }

}
