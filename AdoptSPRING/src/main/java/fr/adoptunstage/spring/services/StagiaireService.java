package fr.adoptunstage.spring.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;


import fr.adoptunstage.spring.message.request.SignUpFormStagiaire;
import fr.adoptunstage.spring.message.response.ResponseMessage;
import fr.adoptunstage.spring.models.Role;
import fr.adoptunstage.spring.models.RoleName;
import fr.adoptunstage.spring.models.Stagiaire;
import fr.adoptunstage.spring.repos.RoleRepository;
import fr.adoptunstage.spring.repos.StagiaireRepository;
import fr.adoptunstage.spring.repos.UserRepository;




@Service
public class StagiaireService {
	
	@Autowired
	StagiaireRepository repository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
	PasswordEncoder encoder;
	
	public List<Stagiaire> getAllStagiaire() {
		System.out.println("Affiche tous les stagiaires...");

		List<Stagiaire> stagiaires = new ArrayList<>();
		repository.findAll().forEach(stagiaires::add);

		return stagiaires;
	}
	
	public ResponseEntity<String> deleteStagiaire(@PathVariable("id") long id) {
		System.out.println("Suppression du stagiaire avec l'ID = " + id + "...");

		repository.deleteById(id);

		return new ResponseEntity<>("Le stagiaire a été supprimé !", HttpStatus.OK);
	}
	
	public ResponseEntity<?> createStagiaire(SignUpFormStagiaire signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken!"),
					HttpStatus.BAD_REQUEST);
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Email is already in use!"),
					HttpStatus.BAD_REQUEST);
		}

		// Creating user's account
		Stagiaire user = new Stagiaire(signUpRequest.getName(), signUpRequest.getUsername(), signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()), signUpRequest.getPrenom(), signUpRequest.getEtablissement(), signUpRequest.getVille(), signUpRequest.getCodePostal(), signUpRequest.getTel());

		Set<String> strRoles = new HashSet<String>();
		strRoles.add("stagiaire");
		Set<Role> roles = new HashSet<>();

		strRoles.forEach(role -> {
			switch (role) {
			case "stagiaire":
				Role stagiaireRole = roleRepository.findByName(RoleName.ROLE_STAGIAIRE)
						.orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
				roles.add(stagiaireRole);

				break;
			default:
				break;
			}
		});

		user.setRoles(roles);
		userRepository.save(user);

		return new ResponseEntity<>(new ResponseMessage("User registered successfully!"), HttpStatus.OK);
	}
	

	
	public ResponseEntity<Stagiaire> updateStagiaire(@PathVariable("id") long id, @RequestBody Stagiaire stagiaire) {
		System.out.println("Mise à jour du stagiaire avec l'ID = " + id + "...");

		Optional<Stagiaire> stagiaireData = repository.findById(id);

		if (stagiaireData.isPresent()) {
			Stagiaire _stagiaire = stagiaireData.get();
			_stagiaire.setPrenom(stagiaire.getPrenom());
			_stagiaire.setName(stagiaire.getName());
			_stagiaire.setEtablissement(stagiaire.getEtablissement());
			_stagiaire.setVille(stagiaire.getVille());
			_stagiaire.setCodePostal(stagiaire.getCodePostal());
			_stagiaire.setTel(stagiaire.getTel());
			_stagiaire.setEmail(stagiaire.getEmail());
			_stagiaire.setPassword(stagiaire.getPassword());
			System.out.println("Nouvelles propriétés du stagiaire = " + _stagiaire.toString());
			return new ResponseEntity<>(repository.save(_stagiaire), HttpStatus.OK);
		} else {
			System.out.println("Aucun stagiaire avec l'ID " + id + " n'est présent dans la base de donnée !");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
}
