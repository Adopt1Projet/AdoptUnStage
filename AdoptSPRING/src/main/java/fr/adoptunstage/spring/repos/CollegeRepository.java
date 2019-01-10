package fr.adoptunstage.spring.repos;


import fr.adoptunstage.spring.models.College;
import org.springframework.data.repository.CrudRepository;

public interface CollegeRepository extends CrudRepository<College, Long> {


}
