package fr.adoptunstage.spring.services;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import fr.adoptunstage.spring.message.request.SignUpFormOffre;
import fr.adoptunstage.spring.message.response.ResponseMessage;
import fr.adoptunstage.spring.models.Entreprise;
import fr.adoptunstage.spring.models.Offre;
import fr.adoptunstage.spring.repos.OffreRepository;
import fr.adoptunstage.spring.repos.UserRepository;

@Service
public class OffreService {

	@Autowired
	OffreRepository repository;
	
	@Autowired
	UserRepository userRepository;

	public Set<Offre> getAllOffres() {
		Set<Offre> offres = new HashSet<Offre>();
		repository.findAll().forEach(offres::add);
		return offres;
	}
	
	public Set<Offre> getMesOffres(String username) {	
		Entreprise entreprise = (Entreprise) userRepository.findByUsername(username)
				.orElseThrow(
				() -> new UsernameNotFoundException
				("User Not Found with -> username or email : " + username));
		Set<Offre> offres = entreprise.getOffres();		
		return offres;
	}


	public ResponseEntity<String> deleteOffre(@PathVariable("id") long id) {
		repository.deleteById(id);
		return new ResponseEntity<>("offre a été supprimée !", HttpStatus.OK);
	}

	public ResponseEntity<String> deleteAll() {
		repository.deleteAll();
		return new ResponseEntity<>("Toutes les offres ont été supprimé!", HttpStatus.OK);
	}

	public ResponseEntity<Offre> updateOffre(@PathVariable("id") long id, @RequestBody Offre offre) {
		Optional<Offre> offreData = repository.findById(id);

		if (offreData.isPresent()) {
			Offre _offre = offreData.get();
			_offre.setTitre(offre.getTitre());
			_offre.setDescription(offre.getDescription());
			_offre.setRue(offre.getRue());
			_offre.setVille(offre.getVille());
			_offre.setCodePostal(offre.getCodePostal());
			_offre.setActive(offre.isActive());

			return new ResponseEntity<>(repository.save(_offre), HttpStatus.OK);
		} else {
			
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> postOffre(String username, SignUpFormOffre requestOffre) {
						
		Entreprise entreprise = (Entreprise) userRepository.findByUsername(username).orElseThrow(
				() -> new UsernameNotFoundException("User Not Found with -> username or email : " + username));
		Boolean active = true;
		
		Offre _offre = new Offre(entreprise, requestOffre.getTitre(), requestOffre.getDescription(), requestOffre.getRue(),
				requestOffre.getVille(), requestOffre.getCodePostal() , active);
		
		repository.save(_offre);
			
		return new ResponseEntity<>(new ResponseMessage("Offre crée!"), HttpStatus.OK);
	}
}
