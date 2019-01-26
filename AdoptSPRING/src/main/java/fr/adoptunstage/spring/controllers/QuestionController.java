package fr.adoptunstage.spring.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.adoptunstage.spring.message.request.QuestionsRequest;
import fr.adoptunstage.spring.models.Question;
import fr.adoptunstage.spring.services.QuestionService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/question")
public class QuestionController {
	
	@Autowired
	QuestionService service;

	@GetMapping("")
	public List<Question> getAllQuestions() {
		return service.getAllQuestions();
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping(value = "/creer/{username}")
	public ResponseEntity<?> postOffre(@PathVariable("username") String username,
			@RequestBody QuestionsRequest requestQuestion) {
		return service.postQuestion(username, requestQuestion);
	}

	@GetMapping(value = "/{id}")
	public Question getQuestion(@PathVariable("id") long id) {

		return service.getQuestion(id);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/{id}")
	public ResponseEntity<Question> updateQuestion(@PathVariable("id") long id, @RequestBody Question question) {
		return service.updateQuestion(id, question);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteQuestion(@PathVariable("id") long id) {
		return service.deleteQuestion(id);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/supprimer")
	public ResponseEntity<String> deleteAll() {
		return service.deleteAll();
	}

}
