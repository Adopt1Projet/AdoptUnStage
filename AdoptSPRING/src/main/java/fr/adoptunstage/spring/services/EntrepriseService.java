package fr.adoptunstage.spring.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import fr.adoptunstage.spring.message.request.SignUpForm;
import fr.adoptunstage.spring.message.response.ResponseMessage;
import fr.adoptunstage.spring.models.Entreprise;
import fr.adoptunstage.spring.models.Role;
import fr.adoptunstage.spring.models.RoleName;
import fr.adoptunstage.spring.models.SignupMail;
import fr.adoptunstage.spring.models.User;
import fr.adoptunstage.spring.repos.EntrepriseRepository;
import fr.adoptunstage.spring.repos.RoleRepository;
import fr.adoptunstage.spring.repos.UserRepository;


@Service
public class EntrepriseService {
	
	@Autowired
	EntrepriseRepository repository;
	
	@Autowired
	MailService mailRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
	PasswordEncoder encoder;

	
	public List<Entreprise> getAllEntreprises() {
		List<Entreprise> entreprises = new ArrayList<>();
		repository.findAll().forEach(entreprises::add);
		for (Entreprise entreprise : entreprises) {
			entreprise.setPassword("");
		}
		return entreprises;
	}
	
	public Entreprise getOneEntreprise(String username) {
		Entreprise entreprise = (Entreprise) userRepository.findByUsername(username).orElseThrow(
				() -> new UsernameNotFoundException("User Not Found with -> username or email : " + username));
		entreprise.setPassword("");
		return entreprise;
	}
	

	
	public ResponseEntity<String> deleteEntreprise(@PathVariable("id") long id) {
		repository.deleteById(id);
		return new ResponseEntity<>("L'entreprise a été supprimée !", HttpStatus.OK);
	}
	
	public ResponseEntity<?> postEntreprise(SignUpForm signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken!"),
					HttpStatus.BAD_REQUEST);
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Email is already in use!"),
					HttpStatus.BAD_REQUEST);
		}

		// Creating user's account
		Entreprise user = new Entreprise(signUpRequest.getName(), signUpRequest.getUsername(), signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()), signUpRequest.getRaisonSociale(), signUpRequest.getSecteur(), signUpRequest.getStatut(), signUpRequest.getSiteWeb(), signUpRequest.getAdresse(), signUpRequest.getVille(), signUpRequest.getCodePostal(), signUpRequest.getLogo(), signUpRequest.getPrenom(), signUpRequest.getContactMail(), signUpRequest.getTel());

		Set<String> strRoles = new HashSet<String>();
		strRoles.add("entreprise");
		Set<Role> roles = new HashSet<>();

		strRoles.forEach(role -> {
			switch (role) {
			case "entreprise":
				Role entrepriseRole = roleRepository.findByName(RoleName.ROLE_ENTREPRISE)
						.orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
				roles.add(entrepriseRole);

				break;
			default:
				break;
			}
		});

		user.setRoles(roles);
		userRepository.save(user);
		
		SignupMail signupEntreprise = new SignupMail(signUpRequest.getEmail(), signUpRequest.getPrenom(),signUpRequest.getEmail());
		mailRepository.signupEntrepriseMail(signupEntreprise);

		return new ResponseEntity<>(new ResponseMessage("User registered successfully!"), HttpStatus.OK);
	}
	
	
	
	public ResponseEntity<?> updateEntreprise(@PathVariable("id") long id, @RequestBody SignUpForm updateRequest) {

		Optional<User> entrepriseData = userRepository.findById(id);

		if (entrepriseData.isPresent()) {
			Entreprise _entreprise = (Entreprise) entrepriseData.get();
									_entreprise.setRaisonSociale(updateRequest.getRaisonSociale());
									_entreprise.setSecteur(updateRequest.getSecteur());
									_entreprise.setStatut(updateRequest.getStatut());
									_entreprise.setSiteWeb(updateRequest.getSiteWeb());
									_entreprise.setAdresse(updateRequest.getAdresse());
									_entreprise.setVille(updateRequest.getVille());
									_entreprise.setCodePostal(updateRequest.getCodePostal());
									_entreprise.setLogo(updateRequest.getLogo());
									_entreprise.setPrenom(updateRequest.getPrenom());
									_entreprise.setName(updateRequest.getName());
									_entreprise.setContactMail(updateRequest.getContactMail());
									_entreprise.setDescription(updateRequest.getDescription());
									_entreprise.setTel(updateRequest.getTel());
									_entreprise.setEmail(updateRequest.getEmail());
									_entreprise.setUsername(updateRequest.getUsername());
							
									
			userRepository.save(_entreprise);
			
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
	
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> updateEntreprisePassword(@PathVariable("id") long id, @RequestBody SignUpForm updateRequest) {

		Optional<User> entrepriseData = userRepository.findById(id);

		if (entrepriseData.isPresent()) {
			Entreprise _entreprise = (Entreprise) entrepriseData.get();
									_entreprise.setPassword(encoder.encode(updateRequest.getPassword()));						
									
			userRepository.save(_entreprise);

			return new ResponseEntity<>(HttpStatus.OK);
		} else {

			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
