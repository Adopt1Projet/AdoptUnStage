package fr.adoptunstage.spring.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import fr.adoptunstage.spring.message.request.ActuRequest;
import fr.adoptunstage.spring.message.response.ResponseMessage;
import fr.adoptunstage.spring.models.Actu;
import fr.adoptunstage.spring.repos.ActuRepository;

@Service
public class ActuService {

	@Autowired
	ActuRepository repository;

	public List<Actu> getAllActus() {
		System.out.println("Affiche toutes les actus...");

		List<Actu> actus = new ArrayList<>();
		repository.findAll().forEach(actus::add);

		return actus;
	}

	public Actu getActu(long id) {

		Actu actu = repository.findById(id)
				.orElseThrow(() -> new UsernameNotFoundException("Actu Not Found with -> id : " + id));
		return actu;
	}

	public ResponseEntity<String> deleteAll() {
		repository.deleteAll();
		return new ResponseEntity<>("Toutes les offres ont été supprimé!", HttpStatus.OK);
	}

	public ResponseEntity<String> deleteActu(@PathVariable("id") long id) {
		repository.deleteById(id);
		return new ResponseEntity<>("offre a été supprimée !", HttpStatus.OK);
	}

	public ResponseEntity<?> postActu(String username, ActuRequest requestActu) {

		Actu _actu = new Actu(requestActu.getTitre(), requestActu.getExergue(), requestActu.getImage(),
				requestActu.getLegendeImage(), requestActu.getParagraphe1(), requestActu.getIntertitre1(),
				requestActu.getParagraphe2(), requestActu.getIntertitre2(), requestActu.getParagraphe3());

		repository.save(_actu);

		return new ResponseEntity<>(new ResponseMessage("Actu créée!"), HttpStatus.OK);
	}

	public ResponseEntity<Actu> updateActu(@PathVariable("id") long id, @RequestBody Actu actu) {
		Optional<Actu> actuData = repository.findById(id);

		if (actuData.isPresent()) {
			Actu _actu = actuData.get();
			_actu.setTitre(actu.getTitre());
			_actu.setExergue(actu.getExergue());
			_actu.setImage(actu.getImage());
			_actu.setLegendeImage(actu.getLegendeImage());
			_actu.setParagraphe1(actu.getParagraphe1());
			_actu.setIntertitre1(actu.getIntertitre1());
			_actu.setParagraphe2(actu.getParagraphe2());
			_actu.setIntertitre2(actu.getIntertitre2());
			_actu.setParagraphe3(actu.getParagraphe3());

			return new ResponseEntity<>(repository.save(_actu), HttpStatus.OK);
		} else {

			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
