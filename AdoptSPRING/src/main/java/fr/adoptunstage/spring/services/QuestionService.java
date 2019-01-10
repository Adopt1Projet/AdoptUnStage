package fr.adoptunstage.spring.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.adoptunstage.spring.models.Question;
import fr.adoptunstage.spring.repos.QuestionRepository;

@Service
public class QuestionService {
	
	@Autowired
	QuestionRepository repository;
	
	public List<Question> getAllQuestions() {

		List<Question> questions = new ArrayList<>();
		repository.findAll().forEach(questions::add);

		return questions;
	}
}
