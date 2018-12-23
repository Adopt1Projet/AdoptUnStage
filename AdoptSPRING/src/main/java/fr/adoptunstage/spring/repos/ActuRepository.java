package fr.adoptunstage.spring.repos;

import org.springframework.data.repository.CrudRepository;

import fr.adoptunstage.spring.models.Actu;

public interface ActuRepository extends CrudRepository<Actu, Long> {
}