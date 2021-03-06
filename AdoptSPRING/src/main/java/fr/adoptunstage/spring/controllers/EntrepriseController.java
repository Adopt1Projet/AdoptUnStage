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

import fr.adoptunstage.spring.message.request.SignUpForm;
import fr.adoptunstage.spring.models.Entreprise;

import fr.adoptunstage.spring.security.services.UserDetailsServiceImpl;
import fr.adoptunstage.spring.services.EntrepriseService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/entreprise")
public class EntrepriseController {

	@Autowired
	EntrepriseService service;
	
	@Autowired
	UserDetailsServiceImpl userService;


	@GetMapping("")
	public List<Entreprise> getAllEntreprises() {
		return service.getAllEntreprises();
	}
	
	@PreAuthorize("#username == authentication.principal.username or hasRole('ROLE_ADMIN')")
	@GetMapping("/getone/{username}")
	public Entreprise getOneEntreprise(@PathVariable("username") String username) {
		return service.getOneEntreprise(username);
	}

	@PostMapping(value = "/creer")
	public ResponseEntity<?> postEntreprise(@Valid @RequestBody SignUpForm signUpRequest) {
		return service.postEntreprise(signUpRequest);
	}
	
	@PostMapping(value = "/creerfile/{username}")
	public ResponseEntity<?> postEntrepriseFile(@PathVariable("username") String username, @RequestParam("file") MultipartFile file) {
		return service.postEntrepriseFile(username, file);
	}
	
	@PreAuthorize("#username == authentication.principal.username or hasRole('ROLE_ADMIN')")
	@PostMapping(value = "/changefile/{username}")
	public ResponseEntity<?> changeEntrepriseFile(@PathVariable("username") String username, @RequestParam("file") MultipartFile file) {
		return service.changeEntrepriseFile(username, file);
	}

	@PreAuthorize("#id == authentication.principal.id or hasRole('ROLE_ADMIN')")
	@PutMapping("/{id}")
	public ResponseEntity<?> updateEntreprise(@PathVariable("id") long id, @RequestBody SignUpForm updateRequest) {
		return service.updateEntreprise(id, updateRequest);
	}
	
	@PreAuthorize("#id == authentication.principal.id or hasRole('ROLE_ADMIN')")
	@PutMapping("/password/{id}")
	public ResponseEntity<?> updateEntreprisePassword(@PathVariable("id") long id, @RequestBody SignUpForm updateRequest) {
		return service.updateEntreprisePassword(id, updateRequest);
	}
	
	@PreAuthorize("#username == authentication.principal.username or hasRole('ROLE_ADMIN')")
	@DeleteMapping("/deleteuser/{username}")
	public ResponseEntity<?> deleteUser(@PathVariable("username") String username) {
		return service.deleteUser(username);
	}
	
	@GetMapping("/actives")
	public List<Entreprise> getEntreprisesActives() {
		return service.getEntreprisesActives();
	}
}
