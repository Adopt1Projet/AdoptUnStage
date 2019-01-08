package fr.adoptunstage.spring.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.adoptunstage.spring.models.HTMLMail;
import fr.adoptunstage.spring.models.Offre;
import fr.adoptunstage.spring.services.MailService;

import java.util.List;

import javax.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders= "*", methods= {RequestMethod.DELETE, RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
@RestController
@RequestMapping("/api")
public class EmailController {
	
	@Autowired 
	MailService service;
	
	@PostMapping("/contact/sendemail")
	@ResponseBody
	
	public HTMLMail sendEmail(@RequestBody HTMLMail mail) {
		return service.sendEmail(mail);
	}
	    String home() {
	        try {
	            sendEmail();
	            return "{ \"message\" : \"Email Sent!\" }";
	        }catch(Exception ex) {
	            return "Error in sending email: "+ex;
	        }
	    }
	 
	 private void sendEmail() throws Exception {
	        MimeMessage message = sender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(message);
//	        
//	        helper.setTo("kevin.radlowski@gmail.com");
//	        helper.setText("How are you?");
//	        helper.setSubject("Hi");
//	        
	        sender.send(message);
	    }
	
}

