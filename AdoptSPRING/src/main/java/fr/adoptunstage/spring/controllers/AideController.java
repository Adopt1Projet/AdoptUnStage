package fr.adoptunstage.spring.controllers;


import fr.adoptunstage.spring.message.request.AideRequest;
import fr.adoptunstage.spring.models.Aide;
import fr.adoptunstage.spring.services.AideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/aide")
public class AideController {

    @Autowired
    AideService service;

    @GetMapping("")
    public List<Aide> getAllAides() { return service.getAllAides(); }

   @PostMapping(value = "/creer/{username}")
	public ResponseEntity<?> postAide(@PathVariable("username") String username,
                                      @RequestBody AideRequest requestAide) {
		return service.postAide(username, requestAide);
	}

	@GetMapping(value = "/{id}")
	public Aide getAide(@PathVariable("id") long id) {

		return service.getAide(id);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Aide> updateAide(@PathVariable("id") long id, @RequestBody Aide aide) {
		return service.updateAide(id, aide);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteAide(@PathVariable("id") long id) {
		return service.deleteAide(id);
	}

	@DeleteMapping("/supprimer")
	public ResponseEntity<String> deleteAll() {
		return service.deleteAll();
	}
}
