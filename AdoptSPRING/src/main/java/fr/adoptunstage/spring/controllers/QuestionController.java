package fr.adoptunstage.spring.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.adoptunstage.spring.models.Question;
import fr.adoptunstage.spring.services.QuestionService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class QuestionController {

	@Autowired
	QuestionService service;

	@GetMapping("/questions")
	public List<Question> getAllQuestions() {
		return service.getAllQuestions();
	}
}
