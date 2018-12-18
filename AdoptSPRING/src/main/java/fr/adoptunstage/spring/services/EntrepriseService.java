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

import fr.adoptunstage.spring.models.Entreprise;
import fr.adoptunstage.spring.repos.EntrepriseRepository;

@Service
public class EntrepriseService {
	
	@Autowired
	EntrepriseRepository repository;
	
	public List<Entreprise> getAllEntreprises() {
		System.out.println("Affiche toutes les entreprises...");

		List<Entreprise> entreprises = new ArrayList<>();
		repository.findAll().forEach(entreprises::add);

		return entreprises;
	}
	
	public Entreprise postEntreprise(@RequestBody Entreprise entreprise) {

		Entreprise _entreprise = repository.save(new Entreprise(
											entreprise.getRaisonSociale(),
											entreprise.getSecteur(),
											entreprise.getStatut(),
											entreprise.getSiteWeb(),
											entreprise.getAdresse(),
											entreprise.getVille(),
											entreprise.getCodePostal(),
											entreprise.getLogo(),
											entreprise.getPrenom(),
											entreprise.getNom(),
											entreprise.getFonction(),
											entreprise.getTel(),
											entreprise.getMail(),
											entreprise.getMdp()
											));
		System.out.println("Nouvelle entreprise = " + _entreprise.toString());
		return _entreprise;
	}
	
	public ResponseEntity<String> deleteEntreprise(@PathVariable("id") long id) {
		System.out.println("Suppression de l'entreprise avec l'ID = " + id + "...");

		repository.deleteById(id);

		return new ResponseEntity<>("L'entreprise a été supprimée !", HttpStatus.OK);
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
									_entreprise.setNom(entreprise.getNom());
									_entreprise.setFonction(entreprise.getFonction());
									_entreprise.setTel(entreprise.getTel());
									_entreprise.setMail(entreprise.getMail());
									_entreprise.setMdp(entreprise.getMdp());
			System.out.println("Nouvelles propriétés de l'entreprise = " + _entreprise.toString());
			return new ResponseEntity<>(repository.save(_entreprise), HttpStatus.OK);
		} else {
			System.out.println("Aucune entreprise avec l'ID " + id + " n'est présente dans la base de donnée !");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
