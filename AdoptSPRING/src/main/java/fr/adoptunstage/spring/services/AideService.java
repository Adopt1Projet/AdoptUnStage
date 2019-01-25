package fr.adoptunstage.spring.services;

import fr.adoptunstage.spring.message.response.ResponseMessage;
import fr.adoptunstage.spring.models.Aide;
import fr.adoptunstage.spring.repos.AideRepository;
import fr.adoptunstage.spring.message.request.AideRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AideService {

    @Autowired
    AideRepository repository;

    public List<Aide> getAllAides() {
        System.out.println("Afficher toutes les aides...");

        List<Aide> aides = new ArrayList<>();
        repository.findAll().forEach(aides::add);

        return aides;
    }

    public Aide getAide(long id) {

        Aide aide = repository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Aide Not Found with -> id : " + id));
        return aide;
    }

    public ResponseEntity<String> deleteAll() {
        repository.deleteAll();
        return new ResponseEntity<>("Toutes les aides ont été supprimées!", HttpStatus.OK);
    }

    public ResponseEntity<String> deleteAide(@PathVariable("id") long id) {
        repository.deleteById(id);
        return new ResponseEntity<>("Aide " + id + " a été supprimée !", HttpStatus.OK);
    }

    public ResponseEntity<?> postAide(String username, AideRequest requestAide) {

        Aide _aide = new Aide(requestAide.getTitre(), requestAide.getIntertitre(), requestAide.getTexte(), "");

        repository.save(_aide);

        return new ResponseEntity<>(new ResponseMessage("Aide créée!"), HttpStatus.OK);
    }

    public ResponseEntity<Aide> updateAide(@PathVariable("id") long id, @RequestBody Aide aide) {
        Optional<Aide> aideData = repository.findById(id);

        if (aideData.isPresent()) {
            Aide _aide = aideData.get();
            _aide.setTitre(aide.getTitre());
            _aide.setIntertitre(aide.getIntertitre());
            _aide.setTexte(aide.getTexte());
            _aide.setLien(aide.getLien());

            return new ResponseEntity<>(repository.save(_aide), HttpStatus.OK);
        } else {

            return new ResponseEntity<> (HttpStatus.NOT_FOUND);
        }
    }
}
