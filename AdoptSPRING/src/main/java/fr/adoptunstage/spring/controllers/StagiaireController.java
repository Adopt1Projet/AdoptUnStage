package fr.adoptunstage.spring.controllers;

import java.util.List;

import javax.validation.Valid;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fr.adoptunstage.spring.message.request.SignUpFormStagiaire;
import fr.adoptunstage.spring.models.Stagiaire;
import fr.adoptunstage.spring.services.StagiaireService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/stagiaire")
public class StagiaireController {

	@Autowired
	StagiaireService service;

	@GetMapping("")
	public List<Stagiaire> getAllStagiaire() {
		return service.getAllStagiaire();
	}

	@GetMapping("/getone/{username}")
	public Stagiaire getOneStagiaire(@PathVariable("username") String username) {
		return service.getOneStagiaire(username);
	}
	
	@PostMapping(value = "/creer")
	public ResponseEntity<?> postStagiaire(@Valid @RequestBody SignUpFormStagiaire signUpRequest) {
		return service.postStagiaire(signUpRequest);
	}
	
	@PostMapping(value = "/creerfile/{username}")
	public ResponseEntity<?> postStagiaireFile(@PathVariable("username") String username, @RequestParam("file") MultipartFile file) {
		return service.postStagiaireFile(username, file);
	}


	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteStagiaire(@PathVariable("id") long id) {
		return service.deleteStagiaire(id);
	}
	@DeleteMapping("/deleteuser/{username}")
	public ResponseEntity<?> deleteUser(@PathVariable("username") String username) {
		return service.deleteUser(username);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateStagiaire(@PathVariable("id") long id, @RequestBody SignUpFormStagiaire updateRequest) {
		return service.updateStagiaire(id, updateRequest);
	}

	@PutMapping("/password/{id}")
	public ResponseEntity<?> updateStagiairePassword(@PathVariable("id") long id, @RequestBody SignUpFormStagiaire updateRequest) {
		return service.updateStagiairePassword(id, updateRequest);
	}

}
