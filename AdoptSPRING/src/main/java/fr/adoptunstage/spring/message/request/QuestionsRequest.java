package fr.adoptunstage.spring.message.request;

public class QuestionsRequest {

	private String question;
	
	private String reponse;

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getReponse() {
		return reponse;
	}

	public void setReponse(String reponse) {
		this.reponse = reponse;
	}
}
