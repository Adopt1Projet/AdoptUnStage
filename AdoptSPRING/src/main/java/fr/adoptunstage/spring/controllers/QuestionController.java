package fr.adoptunstage.spring.controllers;

import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.adoptunstage.spring.models.Question;
import fr.adoptunstage.spring.repos.QuestionRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class QuestionController {

	@Autowired
	QuestionRepository question;

	@GetMapping("/questions")
	public List<Question> getAllQuestions() {
		System.out.println("Affiche toutes les questions...");

		List<Question> questions = new ArrayList<>();
		question.findAll().forEach(questions::add);

		return questions;
	}
}
