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

import fr.adoptunstage.spring.message.request.ActuRequest;
import fr.adoptunstage.spring.models.Actu;
import fr.adoptunstage.spring.services.ActuService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/actus")
public class ActuController {

	@Autowired
	ActuService service;

	@GetMapping("")
	public List<Actu> getAllActus() {
		return service.getAllActus();
	}

	@PostMapping(value = "/creer/{username}")
	public ResponseEntity<?> postOffre(@PathVariable("username") String username,
			@RequestBody ActuRequest requestActu) {
		return service.postActu(username, requestActu);
	}

	@GetMapping(value = "/{id}")
	public Actu getActu(@PathVariable("id") long id) {

		return service.getActu(id);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Actu> updateActu(@PathVariable("id") long id, @RequestBody Actu actu) {
		return service.updateActu(id, actu);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteActu(@PathVariable("id") long id) {
		return service.deleteActu(id);
	}

	@DeleteMapping("/supprimer")
	public ResponseEntity<String> deleteAll() {
		return service.deleteAll();
	}
}
