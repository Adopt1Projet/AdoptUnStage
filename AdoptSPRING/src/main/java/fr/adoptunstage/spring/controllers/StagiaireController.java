package fr.adoptunstage.spring.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.adoptunstage.spring.models.Stagiaire;
import fr.adoptunstage.spring.services.StagiaireService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class StagiaireController {

	@Autowired
	StagiaireService service;

	@GetMapping("/stagiaires")
	public List<Stagiaire> getAllStagiaire() {
		return service.getAllStagiaire();
	}


	@DeleteMapping("/stagiaires/{id}")
	public ResponseEntity<String> deleteStagiaire(@PathVariable("id") long id) {
		return service.deleteStagiaire(id);
	}
	
	@PutMapping("/stagiaires/{id}")
	public ResponseEntity<Stagiaire> updateStagiaire(@PathVariable("id") long id, @RequestBody Stagiaire stagiaire) {
		return service.updateStagiaire(id, stagiaire);
	}
}
