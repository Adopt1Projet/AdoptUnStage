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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import fr.adoptunstage.spring.message.request.SignUpFormStagiaire;
import fr.adoptunstage.spring.message.response.ResponseMessage;
import fr.adoptunstage.spring.models.SignupMail;
import fr.adoptunstage.spring.models.Role;
import fr.adoptunstage.spring.models.RoleName;
import fr.adoptunstage.spring.models.Stagiaire;
import fr.adoptunstage.spring.models.User;
import fr.adoptunstage.spring.payload.UploadFileResponse;
import fr.adoptunstage.spring.repos.RoleRepository;
import fr.adoptunstage.spring.repos.StagiaireRepository;
import fr.adoptunstage.spring.repos.UserRepository;




@Service
public class StagiaireService {
	
	@Autowired
	StagiaireRepository repository;
	
	@Autowired
	MailService mailRepository;
	
	@Autowired
	FileStorageService fileStorageService;
	
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
	PasswordEncoder encoder;
	
	public List<Stagiaire> getAllStagiaire() {
		List<Stagiaire> stagiaires = new ArrayList<>();
		repository.findAll().forEach(stagiaires::add);
		for (Stagiaire stagiaire : stagiaires) {
			stagiaire.setPassword("");
		}
		return stagiaires;
	}

	public Stagiaire getOneStagiaire(String username) {
		Stagiaire stagiaire = (Stagiaire) userRepository.findByUsername(username).orElseThrow(
				() -> new UsernameNotFoundException("User Not Found with -> username or email : " + username));
		stagiaire.setPassword("");
		return stagiaire;
	}

	public ResponseEntity<String> deleteStagiaire(@PathVariable("id") long id) {
		repository.deleteById(id);
		return new ResponseEntity<>("Le stagiaire a été supprimé !", HttpStatus.OK);
	}
	
	public ResponseEntity<?> deleteUser(@PathVariable("username") String username ) {
		
		User user =  userRepository.findByUsername(username).orElseThrow(
				() -> new UsernameNotFoundException("User Not Found with -> username or email : " + username));
		userRepository.delete(user);
		return new ResponseEntity<>(new ResponseMessage("L'entreprise a été supprimée !"), HttpStatus.OK);
	}
	
	public ResponseEntity<?> postStagiaire(SignUpFormStagiaire signUpRequest) {
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
				encoder.encode(signUpRequest.getPassword()), signUpRequest.getCivilite(), signUpRequest.getPrenom(), signUpRequest.getEtablissement(), signUpRequest.getVille(), signUpRequest.getCodePostal());

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
		
		SignupMail signupStagiaire = new SignupMail(signUpRequest.getEmail(), signUpRequest.getPrenom(),signUpRequest.getEmail());
		mailRepository.signupStagiaireMail(signupStagiaire);
		
		return new ResponseEntity<>(new ResponseMessage("User registered successfully!"), HttpStatus.OK);
		
		
		
	}
	
	
	 public ResponseEntity<?> postStagiaireFile(String username, MultipartFile file) {
				
				Stagiaire stagiaire = (Stagiaire) userRepository.findByUsername(username).orElseThrow(
						() -> new UsernameNotFoundException("User Not Found with -> username or email : " + username));
				
		        String fileName = fileStorageService.storeFile(file, stagiaire.getUsername());
		
		        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
		                .path("/api/downloadFile/")
		                .path(fileName)
		                .toUriString();      
		
		        UploadFileResponse uploadFileResponse = new UploadFileResponse(fileName, fileDownloadUri,
		                file.getContentType(), file.getSize());
		        
		        
		        stagiaire.setCV(uploadFileResponse);
		        userRepository.save(stagiaire);
		        
		        return new ResponseEntity<>(new ResponseMessage("File registered successfully!"), HttpStatus.OK);
		    }
	

	
	public ResponseEntity<?> updateStagiaire(@PathVariable("id") long id, @RequestBody SignUpFormStagiaire updateRequest) {

		Optional<User> stagiaireData = userRepository.findById(id);

		if (stagiaireData.isPresent()) {
			Stagiaire _stagiaire = (Stagiaire) stagiaireData.get();
					_stagiaire.setCivilite(updateRequest.getCivilite());
					_stagiaire.setPrenom(updateRequest.getPrenom());
					_stagiaire.setName(updateRequest.getName());
					_stagiaire.setEtablissement(updateRequest.getEtablissement());
					_stagiaire.setVille(updateRequest.getVille());
					_stagiaire.setCodePostal(updateRequest.getCodePostal());
					_stagiaire.setEmail(updateRequest.getEmail());
					_stagiaire.setUsername(updateRequest.getUsername());

			userRepository.save(_stagiaire);
			
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> updateStagiairePassword(@PathVariable("id") long id, @RequestBody SignUpFormStagiaire updateRequest)
	{
		Optional<User> stagiaireData = userRepository.findById(id);

		if (stagiaireData.isPresent()) {
			Stagiaire _stagiaire = (Stagiaire) stagiaireData.get();
			_stagiaire.setPassword(encoder.encode(updateRequest.getPassword()));

			userRepository.save(_stagiaire);
			
			
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
