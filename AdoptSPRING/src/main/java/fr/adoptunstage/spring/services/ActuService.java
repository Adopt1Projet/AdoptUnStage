package fr.adoptunstage.spring.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
