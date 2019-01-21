package fr.adoptunstage.spring.repos;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import fr.adoptunstage.spring.models.Actor;

public interface ActorRepository extends CrudRepository<Actor, Long> {

	Optional<Actor> findByNom(String nom);
}
