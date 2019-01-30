package fr.adoptunstage.spring.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

@CrossOrigin(origins = "http://vps641460.ovh.net")
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
	
    @PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/updatecollege/{id}")
	public ResponseEntity<College> updateCollege(@PathVariable("id") long id, @RequestBody College college) {
		return service.updateCollege(id, college);
	}
	
    @PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping(value = "/creercollege")
	public ResponseEntity<?> createCollege(@RequestBody SignUpFormCollege requestCollege) {
		return service.createCollege(requestCollege);
	}
	
    @PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping(value = "/deletecollege/{id}")
	public ResponseEntity<String> deleteCollege(@PathVariable("id") long id) {
		return service.deleteCollege(id);
	}

}