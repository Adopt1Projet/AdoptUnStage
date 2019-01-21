package fr.adoptunstage.spring.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import fr.adoptunstage.spring.message.request.QuestionsRequest;
import fr.adoptunstage.spring.message.response.ResponseMessage;
import fr.adoptunstage.spring.models.Question;
import fr.adoptunstage.spring.repos.QuestionRepository;

@Service
public class QuestionService {
	
	@Autowired
	QuestionRepository repository;
	
	public List<Question> getAllQuestions() {
		System.out.println("Affiche toutes les Faq...");

		List<Question> questions = new ArrayList<>();
		repository.findAll().forEach(questions::add);

		return questions;
	}
	
	public Question getQuestion(long id) {

		Question question = repository.findById(id)
				.orElseThrow(() -> new UsernameNotFoundException("Question Not Found with -> id : " + id));
		return question;
	}

	public ResponseEntity<String> deleteAll() {
		repository.deleteAll();
		return new ResponseEntity<>("Toutes les offres ont été supprimé!", HttpStatus.OK);
	}

	public ResponseEntity<String> deleteQuestion(@PathVariable("id") long id) {
		repository.deleteById(id);
		return new ResponseEntity<>("offre a été supprimée !", HttpStatus.OK);
	}

	public ResponseEntity<?> postQuestion(String username, QuestionsRequest requestQuestion) {

		Question _question = new Question(requestQuestion.getQuestion(), requestQuestion.getReponse());

		repository.save(_question);

		return new ResponseEntity<>(new ResponseMessage("Question créée!"), HttpStatus.OK);
	}

	public ResponseEntity<Question> updateQuestion(@PathVariable("id") long id, @RequestBody Question question) {
		Optional<Question> questionData = repository.findById(id);

		if (questionData.isPresent()) {
			Question _question = questionData.get();
			_question.setQuestion(question.getQuestion());
			_question.setReponse(question.getReponse());

			return new ResponseEntity<>(repository.save(_question), HttpStatus.OK);
		} else {

			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
