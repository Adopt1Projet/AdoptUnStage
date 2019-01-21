package fr.adoptunstage.spring.repos;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import fr.adoptunstage.spring.models.Actor;
import fr.adoptunstage.spring.models.PartenaireEntreprise;

public interface PartenaireEntrepriseRepository extends CrudRepository<PartenaireEntreprise, Long> {

	Optional<PartenaireEntreprise> findByNom(String nom);
}
