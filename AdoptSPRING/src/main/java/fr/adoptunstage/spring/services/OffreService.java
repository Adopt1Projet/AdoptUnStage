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
import fr.adoptunstage.spring.models.EntrepriseMail;
import fr.adoptunstage.spring.models.HTMLMail;
import fr.adoptunstage.spring.models.Offre;
import fr.adoptunstage.spring.models.Stagiaire;
import fr.adoptunstage.spring.models.StagiaireMail;
import fr.adoptunstage.spring.repos.OffreRepository;
import fr.adoptunstage.spring.repos.UserRepository;
import fr.adoptunstage.spring.security.services.AuthenticationUser;

@Service
public class OffreService {

	@Autowired
	MailService mailRepository;
	
	@Autowired
	AuthenticationUser authenticationUser;

	@Autowired
	OffreRepository repository;

	@Autowired
	UserRepository userRepository;

	public Set<Offre> getAllOffres() {
		Set<Offre> offres = new HashSet<Offre>();
		repository.findAll().forEach(offres::add);
		for (Offre offre : offres) {
			offre.getEntreprise().setPassword("");
		}
		return offres;
	}

	public Set<Offre> getMesOffres(String username) {
		Entreprise entreprise = (Entreprise) userRepository.findByUsername(username).orElseThrow(
				() -> new UsernameNotFoundException("User Not Found with -> username or email : " + username));
		Set<Offre> offres = entreprise.getOffres();
		for (Offre offre : offres) {
			offre.getEntreprise().setPassword("");
		}
		return offres;
	}

	public Set<Offre> getMesOffresStagiaire(String username) {
		Stagiaire stagiaire = (Stagiaire) userRepository.findByUsername(username).orElseThrow(
				() -> new UsernameNotFoundException("User Not Found with -> username or email : " + username));
		Set<Offre> offres = stagiaire.getOffresNonPourvues();
		for (Offre offre : offres) {
			offre.getEntreprise().setPassword("");
		}
		return offres;
	}

	public Set<Offre> getMesOffresStagiairePourvues(String username) {
		Stagiaire stagiaire = (Stagiaire) userRepository.findByUsername(username).orElseThrow(
				() -> new UsernameNotFoundException("User Not Found with -> username or email : " + username));
		Set<Offre> offres = stagiaire.getOffresPourvues();
		for (Offre offre : offres) {
			offre.getEntreprise().setPassword("");
		}
		return offres;
	}

	public Offre getOffre(long id) {

		Offre offre = repository.findById(id)
				.orElseThrow(() -> new UsernameNotFoundException("Offre Not Found with -> id : " + id));
		
		offre.getEntreprise().setPassword("");
		
		return offre;

	}

	public ResponseEntity<String> deleteOffre(@PathVariable("id") long id) {
		Offre offre = repository.findById(id)
				.orElseThrow(() -> new UsernameNotFoundException("Offre Not Found with -> id : " + id));
		String usernameEntreprise = offre.getEntreprise().getUsername();
		
		if (authenticationUser.isValidate(usernameEntreprise)) {
			repository.deleteById(id);
			return new ResponseEntity<>("offre a été supprimée !", HttpStatus.OK);
		}		
		else {
			return new ResponseEntity<>("Pas le bon utilisateur", HttpStatus.FORBIDDEN);
		}	
	}

	public ResponseEntity<String> deleteAll() {
		repository.deleteAll();
		return new ResponseEntity<>("Toutes les offres ont été supprimé!", HttpStatus.OK);
	}

	public ResponseEntity<?> updateOffre(@PathVariable("id") long id, @RequestBody Offre offre) {
		Offre _offre = repository.findById(id).orElseThrow(
				() -> new UsernameNotFoundException("Offre avec l'id suivant introuvable : " + id));;
		
			String usernameEntreprise = _offre.getEntreprise().getUsername();
			
			if (authenticationUser.isValidate(usernameEntreprise)) {	
				_offre.setTitre(offre.getTitre());
				_offre.setDescription(offre.getDescription());
				_offre.setDateDebut(offre.getDateDebut());
				_offre.setDateFin(offre.getDateFin());
				_offre.setRue(offre.getRue());
				_offre.setVille(offre.getVille());
				_offre.setCodePostal(offre.getCodePostal());
				_offre.setActive(offre.isActive());
	
				return new ResponseEntity<>(repository.save(_offre), HttpStatus.OK);
			}
			
			else {return new ResponseEntity<>(HttpStatus.FORBIDDEN);}
		
	}

	public ResponseEntity<?> postOffre(String username, SignUpFormOffre requestOffre) {

		Entreprise entreprise = (Entreprise) userRepository.findByUsername(username).orElseThrow(
				() -> new UsernameNotFoundException("User Not Found with -> username or email : " + username));

		Boolean active = true;

		Offre _offre = new Offre(entreprise, requestOffre.getTitre(), requestOffre.getDescription(),
				requestOffre.getDateDebut(), requestOffre.getDateFin(), requestOffre.getRue(), requestOffre.getVille(),
				requestOffre.getCodePostal(), active);

		repository.save(_offre);

		return new ResponseEntity<>(new ResponseMessage("Offre crée!"), HttpStatus.OK);
	}

	public ResponseEntity<?> postuler(long id_offre, String username, SignUpPostuler requestPostuler) {

		Offre offre = repository.findById(id_offre)
				.orElseThrow(() -> new UsernameNotFoundException("Offre Not Found with -> id : " + id_offre));

		Stagiaire stagiaire = (Stagiaire) userRepository.findByUsername(username).orElseThrow(
				() -> new UsernameNotFoundException("User Not Found with -> username or email : " + username));

		offre.setStagiaire(stagiaire);

		EntrepriseMail mailToEntreprise = new EntrepriseMail(offre.getEntreprise().getContactMail(), offre.getTitre(),
				requestPostuler.getMotivation(), stagiaire.getPrenom(), stagiaire.getName(), stagiaire.getEmail());
		String retourMail = mailRepository.sendEmailToEntreprise(mailToEntreprise, stagiaire.getCV());
		if (retourMail.equals("ko")) {return new ResponseEntity<>(new ResponseMessage("pas de CV !"), HttpStatus.FORBIDDEN);}
		
		StagiaireMail mailToStagiaire = new StagiaireMail(stagiaire.getEmail(), offre.getTitre(), requestPostuler.getMotivation(),
				stagiaire.getPrenom(), offre.getEntreprise().getRaisonSociale());
		mailRepository.sendEmailToStagiaire(mailToStagiaire);
		
		repository.save(offre);

		repository.save(offre);

		return new ResponseEntity<>(new ResponseMessage("Vous avez bien postulé à cette offre!"), HttpStatus.OK);
	}

	public ResponseEntity<?> getPostulants(long id) {
		
		Offre offre = repository.findById(id)
				.orElseThrow(() -> new UsernameNotFoundException("Offre Not Found with -> id : " + id));
		String userEntreprise = offre.getEntreprise().getUsername();

		if (authenticationUser.isValidate(userEntreprise)) {
			Set<Stagiaire> postulants = offre.getStagiaires();		
			return new ResponseEntity<>(postulants, HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(new ResponseMessage("Pas le bon utilisateur !"), HttpStatus.FORBIDDEN);
		}

	}
}
