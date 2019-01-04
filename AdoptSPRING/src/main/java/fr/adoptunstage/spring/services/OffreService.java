package fr.adoptunstage.spring.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import fr.adoptunstage.spring.models.Offre;
import fr.adoptunstage.spring.repos.OffreRepository;

@Service
public class OffreService {

	@Autowired
	OffreRepository repository;

	public List<Offre> getAllOffres() {
		System.out.println("Affiche toutes les offres");

		List<Offre> offres = new ArrayList<>();
		repository.findAll().forEach(offres::add);

		return offres;
	}

	public Offre postEntreprise(@RequestBody Offre offre) {

		Offre _offre = repository.save(new Offre(offre.getTitre(), offre.getDescription(), offre.getRue(),
				offre.getVille(), offre.getCodePostal(), offre.isActive()));
		System.out.println("Nouvelle offre = " + _offre.toString());
		return _offre;
	}

	public ResponseEntity<String> deleteOffre(@PathVariable("id") long id) {
		System.out.println("Suppression de l'offre avec l'ID = " + id + "...");

		repository.deleteById(id);

		return new ResponseEntity<>("offre a été supprimée !", HttpStatus.OK);
	}

	public ResponseEntity<String> deleteAll() {
		System.out.println("Delete All Customers...");

		repository.deleteAll();

		return new ResponseEntity<>("All customers have been deleted!", HttpStatus.OK);
	}

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
			_offre.setActive(offre.isActive());
			System.out.println("Nouvelles propriétés de l'offre = " + _offre.toString());
			return new ResponseEntity<>(repository.save(_offre), HttpStatus.OK);
		} else {
			System.out.println("Aucune offre avec l'ID " + id + " n'est présente dans la base de donnée !");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
