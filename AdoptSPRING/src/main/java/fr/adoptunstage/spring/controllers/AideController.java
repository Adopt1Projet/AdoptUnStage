package fr.adoptunstage.spring.controllers;


import fr.adoptunstage.spring.message.request.AideRequest;
import fr.adoptunstage.spring.models.Aide;
import fr.adoptunstage.spring.services.AideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://vps641460.ovh.net")
@RestController
@RequestMapping("/api/aide")
public class AideController {

    @Autowired
    AideService service;

    @GetMapping("")
    public List<Aide> getAllAides() { return service.getAllAides(); }

   @PreAuthorize("hasRole('ROLE_ADMIN')")
   @PostMapping(value = "/creer/{username}")
	public ResponseEntity<?> postAide(@PathVariable("username") String username,
                                      @RequestBody AideRequest requestAide) {
		return service.postAide(username, requestAide);
	}

	@GetMapping(value = "/{id}")
	public Aide getAide(@PathVariable("id") long id) {

		return service.getAide(id);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/{id}")
	public ResponseEntity<Aide> updateAide(@PathVariable("id") long id, @RequestBody Aide aide) {
		return service.updateAide(id, aide);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteAide(@PathVariable("id") long id) {
		return service.deleteAide(id);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/supprimer")
	public ResponseEntity<String> deleteAll() {
		return service.deleteAll();
	}
}
