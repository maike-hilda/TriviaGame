//make sure the docuemnt is ready before js loads
$( document ).ready(function() {

	var btn = $("<button>");
	btn.addClass("startBtn");
	btn.text("Start Game");
	$("#start").html(btn);
	

	 //array of arrays: question[0], array with answers[1][i], and index of true answer[2], default status of answer false[3], default status of answer selected false[4], and a fun fact[5]
	 var questions = [
    	 ["What is You know who's middle name?", ["Severus", "Horrace", "Tom", "Marvolo"] , 3, false, false, "Lord Voldemort's full name is Tom Marvolo Riddle, Tom after his muggle dad and Marvolo after his grandfather." ], 
    	 ["What does the K in J.K. Rowling stand for?", ["Kathrine", "Kathleen", "Katrina", "Kaley"], 1, false, false, "Joanne Kathleen's last name is pronounced Row-ling, like rowing a boat." ],
    	 ["What is the name of Hermione and Ron's son?", ["Fred", "Albus", "Hugo", "Sirius"], 2, false, false, "Ron and Hermione have two children named Hugo and Rose." ],
    	 ["Who is Neville Longbottom married to?", ["Hannah Abbott", "Luna Lovegood", "Lavender Brown", "Ginny Weasley"], 0, false, false, "Neville Longbottom's  wife Hannah Abbott is landlady of the Leaky Cauldron, entrance to Diagon Alley in London." ],
    	 ["Which of the following items was not a horcrux?", ["Rowena Ravenclaw's Lost Diadem", "Godric Gryffindor's Sword", "Salazar Slytherin's Locket", "Helga Hufflepuff's Cup"], 1, false, false, "Voldemort would have loved to collect all four founder's objects, but he could never find the sort as it only presents itself to a worthy Gryffindor." ],
    	 ["What shape does Hermone's Patronus take?", ["Beaver", "Lynx", "Otter", "Doe"], 2, false, false, "Ron's patronus is a Jack Russell Terrier which are known to chase otters."]

    ];

     //when the start button is clicked, the game loads   
    $(".startBtn").on("click", game);



    

    //this function handles the trivia game's main functions
    function game(){
    	//remvoe the start button
    	$("#start").empty();
    	
    	for (j = 0; j<questions.length; j++) {
    		createForm(questions[j], j);
    	};
    	
    	$(".radioButton").on("click", function(){
    		
    		//logs true/false
    		var answerSelect = $(this).attr("value"); //is the selected answer true or false	
    		var questionSelect = $(this).attr("name"); //which question was answered
    		questions[questionSelect][3] = answerSelect; //this will overwrite if the question was answered true or false, cannot put into if statement since a user might check true, then false
    		questions[questionSelect][4] = true; //this says that the quesiton was answered, whether true or false it won't be counted as "unanswered"
    		console.log("value: " + answerSelect + " question: " + questionSelect);
    		console.log(questions);

    	});
    	//done button
    	doneBtn();
    	

    };


    	
    //this creates the radio buttons and takes as input the question/answer and the question number 	
    function createForm(question, number){

       	//put the question as heading level 2 into the form
    	$("#form" + number).append("<h2>" + question[0] + "</h2>");

    	//create radio buttons
    	for ( i=0; i<4; i++) {
    		var a = question[1][i];
	    	//input tag with answer
	    	var radio = $("<input>" + a + "</input>");
	    	//assign a class to all input tags .radioButton
	    	radio.addClass("radioButton");
	    	//make the input type "radio"
	    	radio.attr("type", "radio");
	    	//give the radio buttons ids 1-4
	    	radio.attr("id", i);
	    	//give the radio buttons name=index of question
	    	radio.attr("name", number);
	    	
	    	//value of the button is true if the answer is the right answer
	    	if ( question[2] === i ) {
	    		radio.attr("value", true);
	    	}
	    	else {
	    		radio.attr("value", false);
	    	};
	    	
	    	//add to the nth form
	    	$("#form" + number).append(radio);

	    	
	    };
    }; //closes createForm

    //this creates the done button 
    function doneBtn() {
    	var btnEnd = $("<button>");
    	btnEnd.addClass("endButton");
    	btnEnd.text("Done");
    	$("#done").html(btnEnd);


    	$(".endButton").on("click", result);

    };
    
    
    function result() {
    		//clear all html
    		$(".form").empty();	
    		$("#done").empty();
    		//display results
    		var correct = 0;
    		var wrong = 0;
    		var unanswered = questions.length;

    		

    		//count all true's in questions
    		for (i=0; i<questions.length; i++) {
    			
    			if (questions[i][3] === "true"){
    				correct++;
    				unanswered--;
    				
    			}
    			else if (questions[i][4] === true && questions[i][3] === "false"){
    				wrong++;
    				unanswered--;
    				
    			};

    		};
    		
    		$("#results").append("<h2>All Done!</h2>");
    		$("#results").append("<p>Correct answers: " + correct + "</p>");
    		$("#results").append("<p>Incorrect answers: " + wrong + "</p>");
    		$("#results").append("<p>Unanswered: " + unanswered + "</p>");
    		$("#fyi").append("<h2>The correct answers are: </h2>");
    		for (i=0; i<questions.length; i++) {
    			$("#fyi").append("<p>" + questions[i][0] + " " + questions[i][1][questions[i][2]] + "</p>");
    			$("#fyi").append("<p>Fun fact: " + questions[i][5] +"</p>");
    		}
    		
    };






    });




    
   

    















