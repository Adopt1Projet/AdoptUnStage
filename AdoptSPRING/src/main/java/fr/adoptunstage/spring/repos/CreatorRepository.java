package fr.adoptunstage.spring.repos;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import fr.adoptunstage.spring.models.Creator;

public interface CreatorRepository extends CrudRepository<Creator, Long> {

	Optional<Creator> findByNom(String nom);
}
