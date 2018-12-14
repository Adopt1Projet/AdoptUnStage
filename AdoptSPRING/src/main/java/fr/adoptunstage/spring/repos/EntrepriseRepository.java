package fr.adoptunstage.spring.repos;

import org.springframework.data.repository.CrudRepository;

import fr.adoptunstage.spring.models.Entreprise;

public interface EntrepriseRepository extends CrudRepository<Entreprise, Long> {
}
