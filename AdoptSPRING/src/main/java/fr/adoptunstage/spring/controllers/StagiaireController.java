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

import fr.adoptunstage.spring.message.request.SignUpFormStagiaire;
import fr.adoptunstage.spring.models.Stagiaire;
import fr.adoptunstage.spring.security.services.AuthenticationUser;
import fr.adoptunstage.spring.services.StagiaireService;

@CrossOrigin(origins = "http://vps641460.ovh.net")
@RestController
@RequestMapping("/api/stagiaire")
public class StagiaireController {

	@Autowired
	StagiaireService service;
	
	@Autowired
	AuthenticationUser authenticationUser;

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("")
	public List<Stagiaire> getAllStagiaire() {
		return service.getAllStagiaire();
	}

	@PreAuthorize("#username == authentication.principal.username or hasRole('ROLE_ADMIN')")
	@GetMapping("/getone/{username}")
	public ResponseEntity<?> getOneStagiaire(@PathVariable("username") String username) {
		return service.getOneStagiaire(username);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping(value = "/adminget/{id}")
	public Stagiaire getAdminStagiaire(@PathVariable("id") long id ) {
		return service.getAdminStagiaire(id);
	}
	
	@PostMapping(value = "/creer")
	public ResponseEntity<?> postStagiaire(@Valid @RequestBody SignUpFormStagiaire signUpRequest) {
		return service.postStagiaire(signUpRequest);
	}
	
	@PreAuthorize("#username == authentication.principal.username or hasRole('ROLE_ADMIN')")
	@PostMapping(value = "/changefile/{username}")
	public ResponseEntity<?> changeStagiaireFile(@PathVariable("username") String username, @RequestParam("file") MultipartFile file) {
		return service.changeStagiaireFile(username, file);
	}
	
	@PostMapping(value = "/creerfile/{username}")
	public ResponseEntity<?> postStagiaireFile(@PathVariable("username") String username, @RequestParam("file") MultipartFile file) {
		return service.postStagiaireFile(username, file);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteStagiaire(@PathVariable("id") long id) {
		return service.deleteStagiaire(id);
	}
	
	@PreAuthorize("#username == authentication.principal.username or hasRole('ROLE_ADMIN')")
	@DeleteMapping("/deleteuser/{username}")
	public ResponseEntity<?> deleteUser(@PathVariable("username") String username) {
		return service.deleteUser(username);
	}
	
	@PreAuthorize("#id == authentication.principal.id or hasRole('ROLE_ADMIN')")
	@PutMapping("/{id}")
	public ResponseEntity<?> updateStagiaire(@PathVariable("id") long id, @RequestBody SignUpFormStagiaire updateRequest) {
		return service.updateStagiaire(id, updateRequest);
	}

	@PreAuthorize("#id == authentication.principal.id or hasRole('ROLE_ADMIN')")
	@PutMapping("/password/{id}")
	public ResponseEntity<?> updateStagiairePassword(@PathVariable("id") long id, @RequestBody SignUpFormStagiaire updateRequest) {
		return service.updateStagiairePassword(id, updateRequest);
	}

}
