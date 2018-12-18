package fr.adoptunstage.spring.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.adoptunstage.spring.models.Partenaire;
import fr.adoptunstage.spring.services.PartenaireService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class PartenaireController {

	@Autowired
	PartenaireService service;

	@GetMapping("/partenaires")
	public List<Partenaire> getAllPartenaires() {
		return service.getAllPartenaires();
	}
}
