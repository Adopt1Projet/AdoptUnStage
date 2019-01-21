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

import fr.adoptunstage.spring.message.request.PartenaireForm;
import fr.adoptunstage.spring.message.request.SignUpForm;
import fr.adoptunstage.spring.message.request.SignUpFormOffre;
import fr.adoptunstage.spring.models.Actor;
import fr.adoptunstage.spring.models.Creator;
import fr.adoptunstage.spring.models.Partenaire;
import fr.adoptunstage.spring.models.PartenaireEntreprise;
import fr.adoptunstage.spring.services.PartenaireService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/partenaires")
public class PartenaireController {

	@Autowired
	PartenaireService service;
	
	@PostMapping(value = "/creerfileactor/{nom}")
	public ResponseEntity<?> postActorFile(@PathVariable("nom") String nom, @RequestParam("file") MultipartFile file) {
		return service.postActorFile(nom, file);
	}
	
	@PostMapping(value = "/creerfilecreator/{nom}")
	public ResponseEntity<?> postCreatorFile(@PathVariable("nom") String nom, @RequestParam("file") MultipartFile file) {
		return service.postCreatorFile(nom, file);
	}
	
	@PostMapping(value = "/creerfilepartenaireentreprise/{nom}")
	public ResponseEntity<?> postPartenaireEntrepriseFile(@PathVariable("nom") String nom, @RequestParam("file") MultipartFile file) {
		return service.postPartenaireEntrepriseFile(nom, file);
	}

	@GetMapping("actor")
	public List<Actor> getAllActors() {
		return service.getAllActors();
	}
	
	
	@PostMapping(value = "/createActor")
	public ResponseEntity<?> postActor(@Valid @RequestBody PartenaireForm requestActor) {
		return service.postActor(requestActor);
	}
	
	@PutMapping("/updateActor/{id}")
	public ResponseEntity<Actor> updateActor(@PathVariable("id") long id, @RequestBody Actor actor) {
		return service.updateActor(id, actor);
	}
	
	@DeleteMapping("/deleteActor/{id}")
	public ResponseEntity<String> deleteActor(@PathVariable("id") long id) {
		return service.deleteActor(id);
	}
	
	@GetMapping(value = "/getActor/{id}")
	public Actor getActor(@PathVariable("id") long id  ) {
		
		return service.getActor(id);
	}
	
	
	@GetMapping("creator")
	public List<Creator> getAllCreators() {
		return service.getAllCreators();
	}
	
	@PostMapping(value = "/createCreator")
	public ResponseEntity<?> postCreator(@Valid @RequestBody PartenaireForm requestCreator) {
		return service.postCreator(requestCreator);
	}
	
	@PutMapping("/updateCreator/{id}")
	public ResponseEntity<Creator> updateCreator(@PathVariable("id") long id, @RequestBody Creator creator) {
		return service.updateCreator(id, creator);
	}
	
	@DeleteMapping("/deleteCreator/{id}")
	public ResponseEntity<String> deleteCreator(@PathVariable("id") long id) {
		return service.deleteCreator(id);
	}
	
	@GetMapping(value = "/getCreator/{id}")
	public Creator getCreator(@PathVariable("id") long id  ) {
		
		return service.getCreator(id);
	}
	
	
	@GetMapping("entreprise")
	public List<PartenaireEntreprise> getAllEntreprises() {
		return service.getAllEntreprises();
	}
	
	@PostMapping(value = "/createEntreprise/")
	public ResponseEntity<?> postEntreprise(@Valid @RequestBody PartenaireForm requestEntreprise) {
		return service.postEntreprise(requestEntreprise);
	}
	
	@PutMapping("/updateEntreprise/{id}")
	public ResponseEntity<PartenaireEntreprise> updateEntreprise(@PathVariable("id") long id, @RequestBody PartenaireEntreprise entreprise) {
		return service.updateEntreprise(id, entreprise);
	}
	
	@DeleteMapping("/deleteEntreprise/{id}")
	public ResponseEntity<String> deleteEntreprise(@PathVariable("id") long id) {
		return service.deleteEntreprise(id);
	}
	
	@GetMapping(value = "/getEntreprise/{id}")
	public PartenaireEntreprise getEntreprise(@PathVariable("id") long id  ) {
		
		return service.getEntreprise(id);
	}
}
