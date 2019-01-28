package fr.adoptunstage.spring.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import fr.adoptunstage.spring.message.request.PartenaireForm;
import fr.adoptunstage.spring.message.response.ResponseMessage;
import fr.adoptunstage.spring.models.Actor;
import fr.adoptunstage.spring.models.Creator;
import fr.adoptunstage.spring.models.Entreprise;
import fr.adoptunstage.spring.models.PartenaireEntreprise;
import fr.adoptunstage.spring.payload.UploadFileResponse;
import fr.adoptunstage.spring.repos.ActorRepository;
import fr.adoptunstage.spring.repos.CreatorRepository;
import fr.adoptunstage.spring.repos.PartenaireEntrepriseRepository;
import fr.adoptunstage.spring.payload.UploadFileResponse;

@Service
public class PartenaireService {
	
	@Autowired
	FileStorageService fileStorageService;

	@Autowired
	ActorRepository actorRepository;

	@Autowired
	CreatorRepository creatorRepository;

	@Autowired
	PartenaireEntrepriseRepository partenaireEntrepriseRepository;

	private static Pattern fileExtnPtrn = Pattern.compile("([^\\s]+(\\.(?i)(jpg|png|gif|jpeg))$)");

	public static boolean validateFileExtn(String ext) {
		Matcher mtch = fileExtnPtrn.matcher(ext);
		if (mtch.matches()) {
			return true;
		}
		return false;
	}

	/*
	 * Service partie Acteur
	 */

	public List<Actor> getAllActors() {
		List<Actor> actors = new ArrayList<>();
		actorRepository.findAll().forEach(actors::add);

		return actors;
	}

	public Actor getActor(long id) {

		Actor actor = actorRepository.findById(id)
				.orElseThrow(() -> new UsernameNotFoundException("Actor Not Found with -> id : " + id));
		;
		return actor;

	}

	public ResponseEntity<Actor> updateActor(@PathVariable("id") long id, @RequestBody Actor actor) {
		Optional<Actor> actorData = actorRepository.findById(id);

		if (actorData.isPresent()) {
			Actor _actor = actorData.get();
			_actor.setNom(actor.getNom());
			_actor.setDescription(actor.getDescription());
			_actor.setSiteWeb(actor.getSiteWeb());

			return new ResponseEntity<>(actorRepository.save(_actor), HttpStatus.OK);
		} else {

			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<String> deleteActor(@PathVariable("id") long id) {
		actorRepository.deleteById(id);
		return new ResponseEntity<>("l'acteur a été supprimé !", HttpStatus.OK);
	}

	public ResponseEntity<?> postActor(PartenaireForm requestActor) {

		Actor _actor = new Actor(requestActor.getNom(), requestActor.getDescription(), requestActor.getSiteWeb());

		actorRepository.save(_actor);

		return new ResponseEntity<>(new ResponseMessage("Actor créé!"), HttpStatus.OK);
	}

	public ResponseEntity<?> postActorFile(@PathVariable("nom") String nom, MultipartFile file) {

		if (validateFileExtn(file.getOriginalFilename())) {

			Actor actor = (Actor) actorRepository.findByNom(nom).orElseThrow(
					() -> new UsernameNotFoundException("actor Not Found with -> username or email : " + nom));

			String fileName = fileStorageService.storeFile(file, actor.getNom());

			String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/downloadFile/")
					.path(fileName).toUriString();

			UploadFileResponse uploadFileResponse = new UploadFileResponse(fileName, fileDownloadUri,
					file.getContentType(), file.getSize());

			actor.setLogo(uploadFileResponse);
			actorRepository.save(actor);

			return new ResponseEntity<>(new ResponseMessage("File registered successfully!"), HttpStatus.OK);
		}
		return new ResponseEntity<>(new ResponseMessage("Le fichier n'a pas le bon format !"), HttpStatus.FORBIDDEN);
	}

	/*
	 * Service partie Créateur
	 */

	public List<Creator> getAllCreators() {

		List<Creator> creators = new ArrayList<>();
		creatorRepository.findAll().forEach(creators::add);

		return creators;
	}

	public Creator getCreator(long id) {

		Creator creator = creatorRepository.findById(id)
				.orElseThrow(() -> new UsernameNotFoundException("Creator Not Found with -> id : " + id));
		;
		return creator;

	}

	public ResponseEntity<Creator> updateCreator(@PathVariable("id") long id, @RequestBody Creator creator) {
		Optional<Creator> creatorData = creatorRepository.findById(id);

		if (creatorData.isPresent()) {
			Creator _creator = creatorData.get();
			_creator.setNom(creator.getNom());
			_creator.setDescription(creator.getDescription());
			_creator.setSiteWeb(creator.getSiteWeb());

			return new ResponseEntity<>(creatorRepository.save(_creator), HttpStatus.OK);
		} else {

			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<String> deleteCreator(@PathVariable("id") long id) {
		creatorRepository.deleteById(id);
		return new ResponseEntity<>("le créateur a été supprimé !", HttpStatus.OK);
	}

	public ResponseEntity<?> postCreator(PartenaireForm requestCreator) {

		Creator _creator = new Creator(requestCreator.getNom(), requestCreator.getDescription(),
				requestCreator.getSiteWeb());

		creatorRepository.save(_creator);

		return new ResponseEntity<>(new ResponseMessage("Creator créé!"), HttpStatus.OK);
	}
	
	
	
	public ResponseEntity<?> postCreatorFile(@PathVariable("nom") String nom, MultipartFile file) {

		if (validateFileExtn(file.getOriginalFilename())) {

			Creator creator = (Creator) creatorRepository.findByNom(nom).orElseThrow(
					() -> new UsernameNotFoundException("creator Not Found with -> username or email : " + nom));

			String fileName = fileStorageService.storeFile(file, creator.getNom());

			String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/downloadFile/")
					.path(fileName).toUriString();

			UploadFileResponse uploadFileResponse = new UploadFileResponse(fileName, fileDownloadUri,
					file.getContentType(), file.getSize());

			creator.setLogo(uploadFileResponse);
			creatorRepository.save(creator);

			return new ResponseEntity<>(new ResponseMessage("File registered successfully!"), HttpStatus.OK);
		}
		return new ResponseEntity<>(new ResponseMessage("Le fichier n'a pas le bon format !"), HttpStatus.FORBIDDEN);
	}

	/*
	 * Service partie Entreprise
	 */

	public List<PartenaireEntreprise> getAllEntreprises() {

		List<PartenaireEntreprise> entreprises = new ArrayList<>();
		partenaireEntrepriseRepository.findAll().forEach(entreprises::add);

		return entreprises;
	}

	public PartenaireEntreprise getEntreprise(long id) {

		PartenaireEntreprise entreprise = partenaireEntrepriseRepository.findById(id)
				.orElseThrow(() -> new UsernameNotFoundException("Entreprise Not Found with -> id : " + id));
		;
		return entreprise;

	}

	public ResponseEntity<PartenaireEntreprise> updateEntreprise(@PathVariable("id") long id,
			@RequestBody PartenaireEntreprise entreprise) {
		Optional<PartenaireEntreprise> entrepriseData = partenaireEntrepriseRepository.findById(id);

		if (entrepriseData.isPresent()) {
			PartenaireEntreprise _entreprise = entrepriseData.get();
			_entreprise.setNom(entreprise.getNom());
			_entreprise.setDescription(entreprise.getDescription());
			_entreprise.setSiteWeb(entreprise.getSiteWeb());

			return new ResponseEntity<>(partenaireEntrepriseRepository.save(_entreprise), HttpStatus.OK);
		} else {

			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<String> deleteEntreprise(@PathVariable("id") long id) {
		partenaireEntrepriseRepository.deleteById(id);
		return new ResponseEntity<>("l'entreprise a été supprimée !", HttpStatus.OK);
	}

	public ResponseEntity<?> postEntreprise(PartenaireForm requestEntreprise) {

		PartenaireEntreprise _entreprise = new PartenaireEntreprise(requestEntreprise.getNom(),
				requestEntreprise.getDescription(), requestEntreprise.getSiteWeb());

		partenaireEntrepriseRepository.save(_entreprise);

		return new ResponseEntity<>(new ResponseMessage("Entreprise créée!"), HttpStatus.OK);
	}
	
	public ResponseEntity<?> postPartenaireEntrepriseFile(@PathVariable("nom") String nom, MultipartFile file) {

		if (validateFileExtn(file.getOriginalFilename())) {

			PartenaireEntreprise partenaireEntreprise = (PartenaireEntreprise) partenaireEntrepriseRepository.findByNom(nom).orElseThrow(
					() -> new UsernameNotFoundException("Partenaire entreprise Not Found with -> username or email : " + nom));

			String fileName = fileStorageService.storeFile(file, partenaireEntreprise.getNom());

			String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/downloadFile/")
					.path(fileName).toUriString();

			UploadFileResponse uploadFileResponse = new UploadFileResponse(fileName, fileDownloadUri,
					file.getContentType(), file.getSize());

					partenaireEntreprise.setLogo(uploadFileResponse);
			partenaireEntrepriseRepository.save(partenaireEntreprise);

			return new ResponseEntity<>(new ResponseMessage("File registered successfully!"), HttpStatus.OK);
		}
		return new ResponseEntity<>(new ResponseMessage("Le fichier n'a pas le bon format !"), HttpStatus.FORBIDDEN);
	}
}
