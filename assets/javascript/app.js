// Harry Potter Trivia in JavaScript and JQuery
"use strict";

$(document).ready(function() {
	let correct, incorrect, unanswered, questionNumber; 
	const startBtn = $("<button>")
		.attr("id", "start-btn")
		.attr("type", "button")
		.addClass("btn btn-primary btn-lg")
		.text("Play");
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
		for (let i = 0; i < questions.length; i++) {
			shuffle(questions[i].answers);
		}
		nextQuestion();
	}

	// Fisher-Yates Shuffle
	function shuffle(array) {
		let currentIndex = array.length;
		let randIndex;
		
		// while there are elements to shuffle
		while (0 !== currentIndex) {
			// pick an element of the remaining elements
			randIndex = Math.floor(Math.random() * currentIndex);
			// since JS is zero based subtract before use
			currentIndex--;
			// swap current and random value
			[array[currentIndex], array[randIndex]] = [array[randIndex], array[currentIndex]];
		}
		return array;
	}
	
	function questionToHtml(question, answers) {
		let questAnsHtml = `<form><fieldset><legend>${question}</legend><div class="form-group">`;
		for (let i = 0; i < answers.length; i++) {
			questAnsHtml += `<div class="custom-control custom-radio"><input type="radio" ` +
				`class="custom-control-input" name="triviaQuestion" id="${answers[i]}" ` +
				`value="${answers[i]}"><label class="custom-control-label" ` +
				`for="${answers[i]}">${answers[i]}</label></div>`;
		}
		questAnsHtml += `<button type="submit" id="submitAnswer" class="btn btn-primary btn-lg">` +
			`Submit</button></div></fieldset></form>`;
		// console.log(questAnsHtml);
		$("#question-answer-score").html(questAnsHtml);
		return question, answers;
	}
	
	function nextQuestion() {
		questionToHtml(questions[questionNumber].question, questions[questionNumber].answers);
	}

	function evaluateStep(correctAnswer, funFact, gif) {
		const isChecked = $('input[name=triviaQuestion]:checked').val();
		console.log(gif);
		$("#question-answer-score").empty();
		let display = `<div class="text-center">`;

		switch(isChecked) {
			case correctAnswer:
				correct++;
				console.log("correct answer", correct);
				display += `<p>Correct</p>`;
				break;
			case undefined:
				unanswered++;
				console.log("no answer", unanswered);
				display += `<p>You did not make a choice.</p><p>The correct answer was ${correctAnswer}.<p>`;
				break;
			default: 
				incorrect++;
				console.log("false answer", incorrect);
				display += `<p>Incorrect</p><p>The correct answer was ${correctAnswer}.<p>`;
		}

		if (questionNumber < questions.length - 1) {
			display += `</div><p>${funFact}</p><button type="button" id="next-btn"` +
				`class="btn btn-primary btn-lg">Next</button>`;
		} else {
			console.log("final question");
			display += `</div><p>${funFact}</p><button type="button" id="final-btn"` +
				`class="btn btn-primary btn-lg">Results</button>`;
		}
		
		const queryURL = `http://api.giphy.com/v1/gifs/search?q=${gif}&api_key=dc6zaTOxFJmzC&limit=1`;
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
	}

	function evaluateFinal() {
		const display = `<div class="text-center"><p>Correct Answers: ${correct}</p><p>Incorrect Answers: ` +
			`${incorrect}</p><p>Unanswered: ${unanswered}</p></div>` + 
			`<button type="button" id="start-btn" class="btn btn-primary btn-lg">Play Again</button>`;
		$("#question-answer-score").html(display);
	}
	
	function timer() {
		
	}

	// load game when pressing Play
	$(document).on("click", "#start-btn", startGame);
	
	$(document).on("click", "#submitAnswer", (event) => {
		event.preventDefault();
		evaluateStep(questions[questionNumber].correct, questions[questionNumber].funFact, 
			questions[questionNumber].gifKeyword);
		questionNumber++;
		console.log("Question #", questionNumber);		
	});

	$(document).on("click", "#next-btn", nextQuestion);

	$(document).on("click", "#final-btn", evaluateFinal);
});