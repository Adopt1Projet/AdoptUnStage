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
import fr.adoptunstage.spring.message.request.SignUpPostuler;
import fr.adoptunstage.spring.message.response.ResponseMessage;
import fr.adoptunstage.spring.models.Entreprise;
import fr.adoptunstage.spring.models.HTMLMail;
import fr.adoptunstage.spring.models.Offre;
import fr.adoptunstage.spring.models.Stagiaire;
import fr.adoptunstage.spring.repos.OffreRepository;
import fr.adoptunstage.spring.repos.UserRepository;

@Service
public class OffreService {
	
	@Autowired
	MailService mailRepository;

	@Autowired
	OffreRepository repository;
	
	@Autowired
	UserRepository userRepository;

	public Set<Offre> getAllOffres() {
		Set<Offre> offres = new HashSet<Offre>();
		repository.findAll().forEach(offres::add);
		for(Offre offre : offres) {
			offre.getEntreprise().setPassword("");
		}
		return offres;
	}
	
	public Set<Offre> getMesOffres(String username) {	
		Entreprise entreprise = (Entreprise) userRepository.findByUsername(username)
				.orElseThrow(
				() -> new UsernameNotFoundException
				("User Not Found with -> username or email : " + username));
		Set<Offre> offres = entreprise.getOffres();
		for(Offre offre : offres) {
			offre.getEntreprise().setPassword("");
		}
		return offres;
	}
	
	public Set<Offre> getMesOffresStagiaire(String username) {	
		Stagiaire stagiaire = (Stagiaire) userRepository.findByUsername(username)
				.orElseThrow(
				() -> new UsernameNotFoundException
				("User Not Found with -> username or email : " + username));
		Set<Offre> offres = stagiaire.getOffresNonPourvues();		
		return offres;
	}
	
	public Set<Offre> getMesOffresStagiairePourvues(String username) {	
		Stagiaire stagiaire = (Stagiaire) userRepository.findByUsername(username)
				.orElseThrow(
				() -> new UsernameNotFoundException
				("User Not Found with -> username or email : " + username));
		Set<Offre> offres = stagiaire.getOffresPourvues();		
		return offres;
	}
	
	public Optional<Offre> getOffre(long id) { 
		
		Offre offre = repository.findById(id).orElseThrow(
				() -> new UsernameNotFoundException("Offre Not Found with -> id : " + id));;
		offre.getEntreprise().setPassword("");;
		return offre ;
		
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
			_offre.setDateDebut(offre.getDateDebut());
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
		
		Offre _offre = new Offre(entreprise, requestOffre.getTitre(), requestOffre.getDescription(),requestOffre.getDateDebut(),requestOffre.getDateFin(), requestOffre.getRue(),
				requestOffre.getVille(), requestOffre.getCodePostal() , active);
		
		repository.save(_offre);
			
		return new ResponseEntity<>(new ResponseMessage("Offre crée!"), HttpStatus.OK);
	}
	
	public ResponseEntity<?> postuler(long id_offre, String username, SignUpPostuler requestPostuler) {
		
		Offre offre = repository.findById(id_offre).orElseThrow(
				() -> new UsernameNotFoundException("Offre Not Found with -> id : " + id_offre));
		
		Stagiaire stagiaire = (Stagiaire) userRepository.findByUsername(username).orElseThrow(
				() -> new UsernameNotFoundException("User Not Found with -> username or email : " + username));

		offre.setStagiaire(stagiaire);

		repository.save(offre);
		
		HTMLMail mailToEntreprise = new HTMLMail (offre.getEntreprise().getEmail(), offre.getTitre(), requestPostuler.getMotivation(), stagiaire.getPrenom(),stagiaire.getName(),stagiaire.getEmail());
		mailRepository.sendEmailToEntreprise(mailToEntreprise);
		
		String messageStagiaire = "Vous avez envoyez votre candidature à " + offre.getEntreprise().getEmail() + ": "+ requestPostuler.getMotivation();
		HTMLMail mailToStagiaire = new HTMLMail (stagiaire.getEmail(), offre.getTitre(), messageStagiaire, stagiaire.getPrenom(),stagiaire.getName(),stagiaire.getEmail());
		mailRepository.sendEmailToEntreprise(mailToStagiaire);
			
		return new ResponseEntity<>(new ResponseMessage("Vous avez bien postulé à cette offre!"), HttpStatus.OK);
	}
}
