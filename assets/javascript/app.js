// Harry Potter Trivia in JavaScript and JQuery
$(document).ready(function () {
	var questions = [
		{
			question: "What is You know who's middle name?",
			answers: ["Severus", "Horrace", "Tom", "Marvolo"],
			correct: "Marvolo",
			funFact: "Lord Voldemort's full name is Tom Marvolo Riddle, " +
				"Tom after his muggle dad and Marvolo after his grandfather.",
			gifKeyword: "Tom Riddle Voldemort"
		 }, {
			question: "What does the K in J.K. Rowling stand for?", 
			answers: ["Kathrine", "Kathleen", "Katrina", "Kaley"],
			correct: "Kathleen", 
			funFact: "Joanne Kathleen's last name is pronounced Row-ling, like rowing a boat.",
			gifKeyword: "J.K. Rowling"
		 }, {
			question: "What is the name of Hermione and Ron's son?",
			answers: ["Fred", "Albus", "Hugo", "Sirius"], 
			correct: "Hugo", 
			funFact: "Ron and Hermione have two children named Hugo and Rose.",
			gifKeyword: "Ron Hermione Hugo"
		 }, {
			question: "Who is Neville Longbottom married to?",
			answers: ["Hannah Abbott", "Luna Lovegood", "Lavender Brown", "Ginny Weasley"],
			correct: "Hannah Abbott",
			funFact: "Neville Longbottom's  wife Hannah Abbott is landlady of the Leaky Cauldron, " +
				"entrance to Diagon Alley in London.",
			gifKeyword: "Neville Longbottom Hannah Abbott"
		 }, {
			question: "Which of the following items was not a horcrux?",
			answers: ["Rowena Ravenclaw's Lost Diadem", "Godric Gryffindor's Sword", 
				"Salazar Slytherin's Locket", "Helga Hufflepuff's Cup"],
			correct: "Godric Gryffindor's Sword",
			funFact: "Voldemort would have loved to collect all four founders objects, but he could never " +
				"find the sword as it only presents itself to a worthy Gryffindor.",
			gifKeyword: "Slytherin's Sword"
		}, {
			question: "What shape does Hermione's Patronus take?",
			answers: ["Beaver", "Lynx", "Otter", "Doe"],
			correct: "Otter",
			funFact: "Ron's patronus is a Jack Russell Terrier which are known to chase otters.",
			gifKeyword: "Hermione Otter Patronus"
		}
	];
	var correct;
	var incorrect;
	var unanswered;
	var questionNumber; 
	var startBtn = $("<button>");
		startBtn.attr("id", "start-btn");
		startBtn.attr("type", "button");
		startBtn.addClass("btn btn-primary btn-lg");
		startBtn.text("Play");
		$("#start").html(startBtn);
	
	function startGame() {
		console.log("Game started");
		$("#start").empty();
		correct = 0;
		incorrect = 0;
		unanswered = 0;
		questionNumber = 0; // this will be 1 less than the question #
		// shuffle order of the questions
		shuffle(questions);
		// shuffle order of answer options
		for (var i = 0; i < questions.length; i++) {
			shuffle(questions[i].answers);
		}
		nextQuestion();
	}

	// Fisher-Yates Shuffle
	function shuffle(array) {
		var currentIndex = array.length;
		var tempVal; 
		var randIndex;
		
		// while there are elements to shuffle
		while (0 !== currentIndex) {
		
				// pick an element of the remaining elements
				randIndex = Math.floor(Math.random() * currentIndex);
				// since JS is zero based subtract before use
				currentIndex--;
			// swap current and random value
				tempVal = array[currentIndex];
				array[currentIndex] = array[randIndex];
				array[randIndex] = tempVal;
		}
		return array;
	}
	
	function questionToHtml(question, answers) {
		var questAnsHtml = '<form><fieldset><legend>' + question + '</legend><div class="form-group">';
		for (var i = 0; i < answers.length; i++) {
			questAnsHtml += '<div class="custom-control custom-radio"><input type="radio" ' +
				'class="custom-control-input" name="triviaQuestion" id="' +
				answers[i] + '" value="' + answers[i] + '"><label class="custom-control-label" ' +
				'for="' + answers[i] + '">' + answers[i] + '</label></div>';
		}
		questAnsHtml += '<button type="submit" id="submitAnswer" class="btn btn-primary btn-lg">' +
			'Submit</button></div></fieldset></form>';
		// console.log(questAnsHtml);
		$("#question-answer-score").html(questAnsHtml);
		return question, answers;
	}
	
	function nextQuestion() {
		questionToHtml(questions[questionNumber].question, questions[questionNumber].answers);
	}

	function evaluateStep(correctAnswer, funFact, gif) {
		var isChecked = $('input[name=triviaQuestion]:checked').val();
		console.log(gif);
		$("#question-answer-score").empty();
		var display = '<div class="text-center">';

		switch(isChecked) {
			case correctAnswer:
				correct++;
				console.log("correct answer", correct);
				display += '<p>Correct</p>';
				break;
			case undefined:
				unanswered++;
				console.log("no answer", unanswered);
				display += "<p>You did not make a choice.</p><p>The correct answer was " + correctAnswer + ".<p>";
				break;
			default: 
			incorrect++;
			console.log("false answer", incorrect);
			display += "<p>Incorrect</p><p>The correct answer was " + correctAnswer + ".<p>";
		}

		if (questionNumber < questions.length -1) {
			display += '</div><p>' + funFact + '</p><button type="button" id="next-btn" ' +
				'class="btn btn-primary btn-lg">Next</button>';
		} else {
			console.log("final question");
			display += '</div><p>' + funFact + '</p><button type="button" id="final-btn" ' +
				'class="btn btn-primary btn-lg">Results</button>';
		}
		
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
      		gif + "&api_key=dc6zaTOxFJmzC&limit=1";
    	// create AJAX call for wizard button clicked
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			display += '<div class="text-center"><img src="' + response.data[0].images.fixed_height.url +
				'" alt="' + gif + '" id="gif"></div>';
			// console.log(display);
			$("#question-answer-score").html(display);	
		});

		// console.log(display);
		// $("#question-answer-score").html(display);
	}

	function evaluateFinal() {
		var display = '<div class="text-center"><p>Correct Answers: ' + correct + '</p><p>Incorrect Answers: ' +
			incorrect + '</p><p>Unanswered: ' + unanswered + '</p></div>' + 
			'<button type="button" id="start-btn" class="btn btn-primary btn-lg">Play Again</button>';
		$("#question-answer-score").html(display);
	}
	
	function timer() {
		
	}

	// load game when pressing Play
	$(document).on("click", "#start-btn", startGame);
	
	$(document).on("click", "#submitAnswer", function(event) {
		event.preventDefault();
		evaluateStep(questions[questionNumber].correct, questions[questionNumber].funFact, 
			questions[questionNumber].gifKeyword);
		questionNumber++;
		console.log("Question #", questionNumber);		
	});

	$(document).on("click", "#next-btn", nextQuestion);

	$(document).on("click", "#final-btn", evaluateFinal);
});