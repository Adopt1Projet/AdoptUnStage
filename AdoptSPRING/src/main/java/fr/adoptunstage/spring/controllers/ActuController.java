package fr.adoptunstage.spring.controllers;

import java.util.List;

import javax.validation.Valid;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fr.adoptunstage.spring.message.request.ActuRequest;
import fr.adoptunstage.spring.models.Actu;
import fr.adoptunstage.spring.services.ActuService;

@CrossOrigin(origins = "http://vps641460.ovh.net")
@RestController
@RequestMapping("/api/actus")
public class ActuController {

	@Autowired
	ActuService service;

	@GetMapping("")
	public List<Actu> getAllActus() {
		return service.getAllActus();
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping(value = "/creerfileactu/{titre}")
	public ResponseEntity<?> postActuFile(@PathVariable("titre") String titre, @RequestParam("file") MultipartFile file) {
		return service.postActuFile(titre, file);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping(value = "/creer/")
	public ResponseEntity<?> postOffre(@Valid @RequestBody ActuRequest requestActu) {
		return service.postActu(requestActu);
	}

	@GetMapping(value = "/{id}")
	public Actu getActu(@PathVariable("id") long id) {

		return service.getActu(id);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/{id}")
	public ResponseEntity<Actu> updateActu(@PathVariable("id") long id, @RequestBody Actu actu) {
		return service.updateActu(id, actu);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteActu(@PathVariable("id") long id) {
		return service.deleteActu(id);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/supprimer")
	public ResponseEntity<String> deleteAll() {
		return service.deleteAll();
	}
}
