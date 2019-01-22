package fr.adoptunstage.spring.repos;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import fr.adoptunstage.spring.models.Actu;

public interface ActuRepository extends CrudRepository<Actu, Long> {

	Optional<Actu> findByTitre(String titre);
}