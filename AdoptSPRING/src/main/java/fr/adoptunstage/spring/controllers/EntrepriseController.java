package fr.adoptunstage.spring.controllers;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.adoptunstage.spring.models.Entreprise;
import fr.adoptunstage.spring.services.EntrepriseService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/entreprises")
public class EntrepriseController {

	@Autowired
	EntrepriseService service;

	@GetMapping("/")
	public List<Entreprise> getAllEntreprises() {
		return service.getAllEntreprises();
	}

	@PostMapping(value = "/creer")
	public Entreprise postEntreprise(@RequestBody Entreprise entreprise) {
		return entreprise;
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteEntreprise(@PathVariable("id") long id) {
		return service.deleteEntreprise(id);
	}
	

	@PutMapping("/{id}")
	public ResponseEntity<Entreprise> updateEntreprise(@PathVariable("id") long id, @RequestBody Entreprise entreprise) {
		return service.updateEntreprise(id, entreprise);
	}
}
