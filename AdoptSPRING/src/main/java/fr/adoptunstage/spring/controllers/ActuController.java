package fr.adoptunstage.spring.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.adoptunstage.spring.models.Actu;
import fr.adoptunstage.spring.services.ActuService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/actus")
public class ActuController {

	@Autowired
	ActuService service;

	@GetMapping("")
	public List<Actu> getAllActus() {
		return service.getAllActus();
	}
}
