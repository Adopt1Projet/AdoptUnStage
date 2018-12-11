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

import fr.adoptunstage.spring.models.Stagiaire;
import fr.adoptunstage.spring.repos.StagiaireRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class StagiaireController {

	@Autowired
	StagiaireRepository repository;

	@GetMapping("/stagiaires")
	public List<Stagiaire> getAllStagiaire() {
		System.out.println("Affiche tous les stagiaires...");

		List<Stagiaire> stagiaires = new ArrayList<>();
		repository.findAll().forEach(stagiaires::add);

		return stagiaires;
	}

	@PostMapping(value = "/stagiaires/creer")
	public Stagiaire postStagiaire(@RequestBody Stagiaire stagiaire) {

		Stagiaire _stagiaire = repository.save(new Stagiaire(
											stagiaire.getPrenom(),
											stagiaire.getNom(),
											stagiaire.getEtablissement(),
											stagiaire.getVille(),
											stagiaire.getCodePostal(),
											stagiaire.getTel(),
											stagiaire.getMail(),
											stagiaire.getMdp()
											));
		return _stagiaire;
	}

	@DeleteMapping("/stagiaires/{id}")
	public ResponseEntity<String> deleteStagiaire(@PathVariable("id") long id) {
		System.out.println("Suppression du stagiaire avec l'ID = " + id + "...");

		repository.deleteById(id);

		return new ResponseEntity<>("Le stagiaire a été supprimé !", HttpStatus.OK);
	}

	@DeleteMapping("/stagiaires/supprimer")
	public ResponseEntity<String> deleteAllStagiaires() {
		System.out.println("Supprime tous les stagiaire...");

		repository.deleteAll();

		return new ResponseEntity<>("Tous les stagiaires ont été supprimés!", HttpStatus.OK);
	}
	

	@PutMapping("/stagiaires/{id}")
	public ResponseEntity<Stagiaire> updateStagiaire(@PathVariable("id") long id, @RequestBody Stagiaire stagiaire) {
		System.out.println("Mise à jour du stagiaire avec l'ID = " + id + "...");

		Optional<Stagiaire> stagiaireData = repository.findById(id);

		if (stagiaireData.isPresent()) {
			Stagiaire _stagiaire = stagiaireData.get();
			_stagiaire.setPrenom(stagiaire.getPrenom());
			_stagiaire.setNom(stagiaire.getNom());
			_stagiaire.setEtablissement(stagiaire.getEtablissement());
			_stagiaire.setVille(stagiaire.getVille());
			_stagiaire.setCodePostal(stagiaire.getCodePostal());
			_stagiaire.setTel(stagiaire.getTel());
			_stagiaire.setMail(stagiaire.getMail());
			_stagiaire.setMdp(stagiaire.getMdp());
			return new ResponseEntity<>(repository.save(_stagiaire), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
