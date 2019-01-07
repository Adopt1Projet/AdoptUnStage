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

import fr.adoptunstage.spring.message.request.SignUpForm;
import fr.adoptunstage.spring.message.response.ResponseMessage;
import fr.adoptunstage.spring.models.Entreprise;
import fr.adoptunstage.spring.models.Role;
import fr.adoptunstage.spring.models.RoleName;
import fr.adoptunstage.spring.models.User;
import fr.adoptunstage.spring.repos.EntrepriseRepository;
import fr.adoptunstage.spring.repos.RoleRepository;
import fr.adoptunstage.spring.repos.UserRepository;
import fr.adoptunstage.spring.security.services.UserPrinciple;

@Service
public class EntrepriseService {
	
	@Autowired
	EntrepriseRepository repository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
	PasswordEncoder encoder;

	
	public List<Entreprise> getAllEntreprises() {
		System.out.println("Affiche toutes les entreprises...");

		List<Entreprise> entreprises = new ArrayList<>();
		repository.findAll().forEach(entreprises::add);

		return entreprises;
	}
	
	public Entreprise getOneEntreprise(String username) {
		Entreprise user = (Entreprise) userRepository.findByUsername(username).orElseThrow(
				() -> new UsernameNotFoundException("User Not Found with -> username or email : " + username));
		return user;
	}
	

	
	public ResponseEntity<String> deleteEntreprise(@PathVariable("id") long id) {
		System.out.println("Suppression de l'entreprise avec l'ID = " + id + "...");

		repository.deleteById(id);

		return new ResponseEntity<>("L'entreprise a été supprimée !", HttpStatus.OK);
	}
	
	public ResponseEntity<?> createEntreprise(SignUpForm signUpRequest) {
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
				encoder.encode(signUpRequest.getPassword()), signUpRequest.getRaisonSociale(), signUpRequest.getSecteur(), signUpRequest.getStatut(), signUpRequest.getSiteWeb(), signUpRequest.getAdresse(), signUpRequest.getVille(), signUpRequest.getCodePostal(), signUpRequest.getLogo(), signUpRequest.getPrenom(), signUpRequest.getFonction(), signUpRequest.getTel());

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

		return new ResponseEntity<>(new ResponseMessage("User registered successfully!"), HttpStatus.OK);
	}
	
	
	
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
									_entreprise.setName(entreprise.getName());
									_entreprise.setFonction(entreprise.getFonction());
									_entreprise.setTel(entreprise.getTel());
									_entreprise.setEmail(entreprise.getEmail());
									_entreprise.setPassword(entreprise.getPassword());
			System.out.println("Nouvelles propriétés de l'entreprise = " + _entreprise.toString());
			return new ResponseEntity<>(repository.save(_entreprise), HttpStatus.OK);
		} else {
			System.out.println("Aucune entreprise avec l'ID " + id + " n'est présente dans la base de donnée !");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
