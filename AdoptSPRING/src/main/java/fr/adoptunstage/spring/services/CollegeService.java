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

import fr.adoptunstage.spring.message.request.SignUpFormCollege;
import fr.adoptunstage.spring.message.response.ResponseMessage;
import fr.adoptunstage.spring.models.College;
import fr.adoptunstage.spring.repos.CollegeRepository;

@Service
public class CollegeService {

    @Autowired
    CollegeRepository repository;

    public List<College> getAllColleges() {
        List<College> colleges = new ArrayList<>();
        repository.findAll().forEach(colleges::add);
        return colleges;
    }
    
    public College getOneCollege(long id) {
    	College college = repository.findById(id).orElseThrow(
				() -> new UsernameNotFoundException("Aucun collège avec l'id : " + id));
		return college;
	}

    public ResponseEntity<?> createCollege(SignUpFormCollege requestCollege) {

    	College _college = new College(requestCollege.getNom(), 
    								   requestCollege.getAdresse(),
    								   requestCollege.getVille(),
    								   requestCollege.getCodePostal(),
									   requestCollege.getContactPublic(),
									   requestCollege.getNomReferent(),
									   requestCollege.getPrenomReferent(),
									   requestCollege.getEmailReferent(),
									   requestCollege.getTelReferent());

		repository.save(_college);

		return new ResponseEntity<>(new ResponseMessage("Collège ajouté à la base de donnée ! Infos : " + _college.toString()), HttpStatus.OK);
	}
    
    public ResponseEntity<College> updateCollege(@PathVariable("id") long id, @RequestBody College college) {
		Optional<College> collegeData = repository.findById(id);

		if (collegeData.isPresent()) {
			College _college = (College) collegeData.get();
			_college.setNom(college.getNom());
			_college.setAdresse(college.getAdresse());
			_college.setVille(college.getVille());
			_college.setCodePostal(college.getCodePostal());
			_college.setContactPublic(college.getContactPublic());
			_college.setNomReferent(college.getNomReferent());
			_college.setPrenomReferent(college.getPrenomReferent());
			_college.setEmailReferent(college.getEmailReferent());
			_college.setTelReferent(college.getTelReferent());

			return new ResponseEntity<>(repository.save(_college), HttpStatus.OK);
		} else {

			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
    
    public ResponseEntity<String> deleteCollege(@PathVariable("id") long id) {
		repository.deleteById(id);
		return new ResponseEntity<>("Le collège a été supprimé !" , HttpStatus.OK);
	}
}