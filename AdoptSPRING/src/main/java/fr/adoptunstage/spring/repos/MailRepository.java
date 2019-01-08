package fr.adoptunstage.spring.repos;

import org.springframework.data.repository.CrudRepository;

import fr.adoptunstage.spring.models.HTMLMail;
import fr.adoptunstage.spring.models.Offre;

public interface MailRepository extends CrudRepository<HTMLMail, Long> {

}
