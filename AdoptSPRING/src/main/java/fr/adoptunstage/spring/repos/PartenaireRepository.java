package fr.adoptunstage.spring.repos;

import org.springframework.data.repository.CrudRepository;

import fr.adoptunstage.spring.models.Partenaire;

public interface PartenaireRepository extends CrudRepository<Partenaire, Long> {
}
