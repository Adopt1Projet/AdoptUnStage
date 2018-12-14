package fr.adoptunstage.spring.repos;

import org.springframework.data.repository.CrudRepository;

import fr.adoptunstage.spring.models.Offre;

public interface OffreRepository extends CrudRepository<Offre, Long> {
}
