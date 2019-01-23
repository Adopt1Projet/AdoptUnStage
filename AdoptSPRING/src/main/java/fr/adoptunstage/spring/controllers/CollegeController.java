package fr.adoptunstage.spring.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.adoptunstage.spring.message.request.SignUpFormCollege;
import fr.adoptunstage.spring.models.College;
import fr.adoptunstage.spring.services.CollegeService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/colleges")
public class CollegeController {

    @Autowired
    CollegeService service;

    @GetMapping("")
    public List<College> getAllColleges() {
        return service.getAllColleges();
    }
    
    @GetMapping("/getcollege/{id}")
	public College getOneCollege(@PathVariable("id") long id) {
		return service.getOneCollege(id);
	}
	
	@PutMapping("/updatecollege/{id}")
	public ResponseEntity<College> updateCollege(@PathVariable("id") long id, @RequestBody College college) {
		return service.updateCollege(id, college);
	}
	
	@PostMapping(value = "/creercollege")
	public ResponseEntity<?> createCollege(@RequestBody SignUpFormCollege requestCollege) {
		return service.createCollege(requestCollege);
	}
	
	@DeleteMapping(value = "/deletecollege/{id}")
	public ResponseEntity<String> deleteCollege(@PathVariable("id") long id) {
		return service.deleteCollege(id);
	}

}