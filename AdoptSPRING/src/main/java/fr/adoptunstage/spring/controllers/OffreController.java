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

import fr.adoptunstage.spring.models.Offre;
import fr.adoptunstage.spring.services.OffreService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class OffreController{

	@Autowired
	OffreService service;

	@GetMapping("/offre")
	public List<Offre> getAllOffres() {
		return service.getAllOffres();
	}

	@PostMapping(value = "/offre/creer")
	public Offre postEntreprise(@RequestBody Offre offre) {

		return service.postEntreprise(offre);
	}

	@DeleteMapping("/offres/{id}")
	public ResponseEntity<String> deleteOffre(@PathVariable("id") long id) {
		return service.deleteOffre(id);
	}

	@PutMapping("/offre/{id}")
	public ResponseEntity<Offre> updateOffre(@PathVariable("id") long id, @RequestBody Offre offre) {
		return service.updateOffre(id, offre);

	}
}
