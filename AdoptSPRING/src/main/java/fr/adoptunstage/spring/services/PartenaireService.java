package fr.adoptunstage.spring.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.adoptunstage.spring.models.Partenaire;
import fr.adoptunstage.spring.repos.PartenaireRepository;

@Service
public class PartenaireService {
	
	@Autowired
	PartenaireRepository repository;
	
	public List<Partenaire> getAllPartenaires() {

		List<Partenaire> partenaires = new ArrayList<>();
		repository.findAll().forEach(partenaires::add);

		return partenaires;
	}
}
