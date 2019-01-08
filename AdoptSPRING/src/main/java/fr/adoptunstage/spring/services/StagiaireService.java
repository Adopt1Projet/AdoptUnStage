package fr.adoptunstage.spring.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;


import fr.adoptunstage.spring.message.request.SignUpFormStagiaire;
import fr.adoptunstage.spring.message.response.ResponseMessage;
import fr.adoptunstage.spring.models.Role;
import fr.adoptunstage.spring.models.RoleName;
import fr.adoptunstage.spring.models.Stagiaire;
import fr.adoptunstage.spring.models.User;
import fr.adoptunstage.spring.repos.RoleRepository;
import fr.adoptunstage.spring.repos.StagiaireRepository;
import fr.adoptunstage.spring.repos.UserRepository;
import fr.adoptunstage.spring.security.services.UserPrinciple;



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

	public Stagiaire getOneStagiaire(String username) {
		Stagiaire user = (Stagiaire) userRepository.findByUsername(username).orElseThrow(
				() -> new UsernameNotFoundException("User Not Found with -> username or email : " + username));
		return user;
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
	

	
	public ResponseEntity<?> updateStagiaire(@PathVariable("id") long id, @RequestBody SignUpFormStagiaire updateRequest) {
		System.out.println("Mise à jour du stagiaire avec l'ID = " + id + "...");

		Optional<User> stagiaireData = userRepository.findById(id);

		if (stagiaireData.isPresent()) {
			Stagiaire _stagiaire = (Stagiaire) stagiaireData.get();
					_stagiaire.setPrenom(updateRequest.getPrenom());
					_stagiaire.setName(updateRequest.getName());
					_stagiaire.setEtablissement(updateRequest.getEtablissement());
					_stagiaire.setVille(updateRequest.getVille());
					_stagiaire.setCodePostal(updateRequest.getCodePostal());
					_stagiaire.setTel(updateRequest.getTel());
					_stagiaire.setEmail(updateRequest.getEmail());

			userRepository.save(_stagiaire);
			System.out.println("Nouvelles propriétés du stagiaire = " + _stagiaire.toString());
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			System.out.println("Aucun stagiaire avec l'ID " + id + " n'est présent dans la base de donnée !");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> updateStagiairePassword(@PathVariable("id") long id, @RequestBody SignUpFormStagiaire updateRequest)
	{
		System.out.println("Mise à jour du stagiaire avec l'ID = " + id + "...");

		Optional<User> stagiaireData = userRepository.findById(id);

		if (stagiaireData.isPresent()) {
			Stagiaire _stagiaire = (Stagiaire) stagiaireData.get();
			_stagiaire.setPassword(encoder.encode(updateRequest.getPassword()));


			userRepository.save(_stagiaire);
			System.out.println("Password modifié " + _stagiaire.toString());
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			System.out.println("Aucun stagiaire avec l'ID " + id + " n'est présent dans la base de données !");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
