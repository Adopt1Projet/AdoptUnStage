package fr.adoptunstage.spring.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import fr.adoptunstage.spring.models.HTMLMail;
import fr.adoptunstage.spring.services.MailService;

@CrossOrigin(origins = "http://vps641460.ovh.net", allowedHeaders= "*", methods= {RequestMethod.DELETE, RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
@RestController
@RequestMapping("/api")
public class EmailController {
	
	@Autowired 
	private MailService service;
	
	@PostMapping("/contact/sendemail")
	@ResponseBody
	public ResponseEntity<?> sendMail(@RequestBody HTMLMail mail){
		return service.sendEmail(mail);
	}
}

