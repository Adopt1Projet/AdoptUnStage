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

import fr.adoptunstage.spring.models.Entreprise;
import fr.adoptunstage.spring.repos.EntrepriseRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class EntrepriseController {

	@Autowired
	EntrepriseRepository repository;

	@GetMapping("/entreprises")
	public List<Entreprise> getAllEntreprises() {
		System.out.println("Affiche toutes les entreprises...");

		List<Entreprise> entreprises = new ArrayList<>();
		repository.findAll().forEach(entreprises::add);

		return entreprises;
	}

	@PostMapping(value = "/entreprises/creer")
	public Entreprise postEntreprise(@RequestBody Entreprise customer) {

		Entreprise _entreprise = repository.save(new Entreprise(
											customer.getRaisonSociale(),
											customer.getSecteur(),
											customer.getStatut(),
											customer.getSiteWeb(),
											customer.getAdresse(),
											customer.getVille(),
											customer.getCodePostal(),
											customer.getLogo(),
											customer.getPrenom(),
											customer.getNom(),
											customer.getFonction(),
											customer.getTel(),
											customer.getMail(),
											customer.getMdp()
											));
		return _entreprise;
	}

	@DeleteMapping("/entreprises/{id}")
	public ResponseEntity<String> deleteEntreprise(@PathVariable("id") long id) {
		System.out.println("Suppression de l'entreprise avec l'ID = " + id + "...");

		repository.deleteById(id);

		return new ResponseEntity<>("L'entreprise a été supprimée !", HttpStatus.OK);
	}

	@DeleteMapping("/enterprises/supprimer")
	public ResponseEntity<String> deleteAllEntreprises() {
		System.out.println("Suppression de toutes les entreprises...");

		repository.deleteAll();

		return new ResponseEntity<>("Toutes les entreprises ont été supprimées !", HttpStatus.OK);
	}
	

	@PutMapping("/entreprises/{id}")
	public ResponseEntity<Entreprise> updateEntreprise(@PathVariable("id") long id, @RequestBody Entreprise entreprise) {
		System.out.println("Mise à jour de l'entreprise avec l'ID = " + id + "...");

		Optional<Entreprise> entrepriseData = repository.findById(id);

		if (entrepriseData.isPresent()) {
			Entreprise _entreprise = entrepriseData.get();
			_entreprise.setRaisonSociale(entreprise.getRaisonSociale());
			_entreprise.setSecteur(entreprise.getSecteur());
			_entreprise.setStatut(entreprise.getStatut());
			_entreprise.setSiteWeb(entreprise.getSiteWeb());
			_entreprise.setVille(entreprise.getAdresse());
			_entreprise.setVille(entreprise.getVille());
			_entreprise.setCodePostal(entreprise.getCodePostal());
			_entreprise.setLogo(entreprise.getLogo());
			_entreprise.setPrenom(entreprise.getPrenom());
			_entreprise.setNom(entreprise.getNom());
			_entreprise.setFonction(entreprise.getFonction());
			_entreprise.setTel(entreprise.getTel());
			_entreprise.setMail(entreprise.getMail());
			_entreprise.setMdp(entreprise.getMdp());
			return new ResponseEntity<>(repository.save(_entreprise), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
