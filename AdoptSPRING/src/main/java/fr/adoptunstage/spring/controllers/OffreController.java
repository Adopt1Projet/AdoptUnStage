package fr.adoptunstage.spring.controllers;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import fr.adoptunstage.spring.repos.OffreRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class OffreController{

	@Autowired
	OffreRepository repository;

	@GetMapping("/offre")
	public List<Offre> getAllOffres() {
		System.out.println("Affiche toutes les offres");

		List<Offre> offres = new ArrayList<>();
		repository.findAll().forEach(offres::add);

		return offres;
	}

	@PostMapping(value = "/offre/creer")
	public Offre postEntreprise(@RequestBody Offre offre) {

		Offre _offre = repository.save(new Offre(
											offre.getTitre(),
											offre.getDescription(),
											offre.getRue(),
											offre.getVille(),
											offre.getCodePostal()
											
											));
		return _offre;
	}

	@DeleteMapping("/offres/{id}")
	public ResponseEntity<String> deleteOffre(@PathVariable("id") long id) {
		System.out.println("Suppression de l'offre avec l'ID = " + id + "...");

		repository.deleteById(id);

		return new ResponseEntity<>("offre a été supprimée !", HttpStatus.OK);
	}

	@DeleteMapping("/offres/supprimer")
	public ResponseEntity<String> deleteAllEntreprises() {
		System.out.println("Suppression de toutes les offres...");

		repository.deleteAll();

		return new ResponseEntity<>("Toutes les offres ont été supprimées !", HttpStatus.OK);
	}
	

	@PutMapping("/offre/{id}")
	public ResponseEntity<Offre> updateOffre(@PathVariable("id") long id, @RequestBody Offre offre) {
		System.out.println("Mise à jour de l'entreprise avec l'ID = " + id + "...");

		Optional<Offre> offreData = repository.findById(id);

		if (offreData.isPresent()) {
			Offre _offre = offreData.get();
			_offre.setTitre(offre.getTitre());
			_offre.setDescription(offre.getDescription());
			_offre.setRue(offre.getRue());
			_offre.setVille(offre.getVille());
			_offre.setCodePostal(offre.getCodePostal());
		
			return new ResponseEntity<>(repository.save(_offre), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
