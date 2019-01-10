package fr.adoptunstage.spring.controllers;


import fr.adoptunstage.spring.models.College;
import fr.adoptunstage.spring.services.CollegeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/college")
public class CollegeController {

    @Autowired
    CollegeService service;

    @GetMapping("")
    public Set<College> getAllColleges() {
        return service.getAllColleges();
    }

}
