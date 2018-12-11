package fr.adoptunstage.spring.repos;

import org.springframework.data.repository.CrudRepository;

import fr.adoptunstage.spring.models.Stagiaire;

public interface StagiaireRepository extends CrudRepository<Stagiaire, Long> {
}
