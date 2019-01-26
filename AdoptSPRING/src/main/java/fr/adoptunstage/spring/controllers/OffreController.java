package fr.adoptunstage.spring.controllers;


import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.adoptunstage.spring.message.request.SignUpFormOffre;
import fr.adoptunstage.spring.message.request.SignUpPostuler;
import fr.adoptunstage.spring.models.Offre;
import fr.adoptunstage.spring.models.Stagiaire;
import fr.adoptunstage.spring.services.OffreService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/offre")
public class OffreController{

	@Autowired
	OffreService service;

	@GetMapping("")
	public Set<Offre> getAllOffres() {
		return service.getAllOffres();
	}

	@PreAuthorize("#username == authentication.principal.username or hasRole('ROLE_ADMIN')")
	@PostMapping(value = "/creer/{username}")
	public ResponseEntity<?> postOffre(@PathVariable("username") String username, 
			@RequestBody SignUpFormOffre requestOffre) {
		return service.postOffre(username, requestOffre);
	}
	
	@PreAuthorize("#username == authentication.principal.username or hasRole('ROLE_ADMIN')")
	@GetMapping(value = "/mesoffres/{username}")
	public Set<Offre> getMesOffres(@PathVariable("username") String username ) {
		return service.getMesOffres(username);
	}
	
	@PreAuthorize("#username == authentication.principal.username or hasRole('ROLE_ADMIN')")
	@GetMapping(value = "/mesoffresstagiaire/{username}")
	public Set<Offre> getMesOffresStagiaire(@PathVariable("username") String username ) {
		return service.getMesOffresStagiaire(username);
	}
	
	@PreAuthorize("#username == authentication.principal.username or hasRole('ROLE_ADMIN')")
	@GetMapping(value = "/mesoffresstagiairepourvues/{username}")
	public Set<Offre> getMesOffresStagiairePourvues(@PathVariable("username") String username ) {
		return service.getMesOffresStagiairePourvues(username);
	}
	
	@GetMapping(value = "/uneoffre/{id}")
	public Offre getOffre(@PathVariable("id") long id  ) {
		
		return service.getOffre(id);
	}
	
	// secure dans service
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteOffre(@PathVariable("id") long id) {
		return service.deleteOffre(id);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/supprimer")
	public ResponseEntity<String> deleteAll() {
		return service.deleteAll();
	}

	// secure dans service
	@PutMapping("/{id}")
	public ResponseEntity<?> updateOffre(@PathVariable("id") long id, @RequestBody Offre offre) {
		return service.updateOffre(id, offre);
	}
	
	@PreAuthorize("#username == authentication.principal.username or hasRole('ROLE_ADMIN')")
	@PostMapping(value = "/postuler/{id_offre}/{username}")
	public ResponseEntity<?> postuler(@PathVariable("id_offre") long id_offre, @PathVariable("username") String username, 
			@RequestBody SignUpPostuler requestPostuler) {
		return service.postuler(id_offre, username, requestPostuler);
	}
	
	// secure dans service
	@GetMapping(value = "/postulants/{id}")
	public ResponseEntity<?> getPostulants(@PathVariable("id") long id  ) {
		return service.getPostulants(id);
	}
	
	
}