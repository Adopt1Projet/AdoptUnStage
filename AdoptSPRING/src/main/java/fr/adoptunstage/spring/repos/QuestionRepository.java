package fr.adoptunstage.spring.repos;

import org.springframework.data.repository.CrudRepository;

import fr.adoptunstage.spring.models.Question;

public interface QuestionRepository extends CrudRepository<Question, Long> {
}
