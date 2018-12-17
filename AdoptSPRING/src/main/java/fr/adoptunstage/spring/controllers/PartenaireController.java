package fr.adoptunstage.spring.controllers;

import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.adoptunstage.spring.models.Partenaire;
import fr.adoptunstage.spring.repos.PartenaireRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class PartenaireController {

	@Autowired
	PartenaireRepository repository;
	
	@GetMapping("/partenaires")
	@PreAuthorize("hasRole('ADMIN')")
	public List<Partenaire> getAllPartenaires() {
		System.out.println("Affiche tous les partenaires...");

		List<Partenaire> partenaires = new ArrayList<>();
		repository.findAll().forEach(partenaires::add);

		return partenaires;
	}
}
