//These are the global variables
var x = "";
var test = "";
var wins = "";
var time = "";
var pause = "";
var losses = "";
var theStory = "";
var activeQuestion = "";

//These are the question objects
var question1 = {
	question: "Question: How many colors are there on a typical Rubiks Cube?",
	answer1: "6",
	answer2: "5",
	answer3: "3",
	answer4: "9",
	correct: "6",
	solution: "answer1",
	image: "<img src=\"assets/images/rubiks.bmp\">",
};

var question2 = {
	question: "Question: How many mini cubes or \"cubies\" make up a single Rubiks Cube?",
	answer1: "33",
	answer2: "9",
	answer3: "26",
	answer4: "I'm not sure",
	correct: "26",
	solution: "answer3",
	image: "<img src=\"assets/images/cubies.bmp\">",
};

var question3 = {
	question: "Question: What year was the first Rubiks Cube sold?",
	answer1: "1842",
	answer2: "1909",
	answer3: "1941",
	answer4: "1974",
	correct: "1974",
	solution: "answer4",
	image: "<img src=\"assets/images/oldschool.bmp\">",
};

var question4 = {
	question: "Question: Approximately how many Rubiks cubes are there in the World?",
	answer1: "25,000",
	answer2: "1,250,000",
	answer3: "50,000,000",
	answer4: "350,000,000",
	correct: "over 350m sold worldwide, making it the bestselling toy of all time",
	solution: "answer4",
	image: "<img src=\"assets/images/rubiksworld.bmp\">",
};

var question5 = {
	question: "Question: What is the World record for solving a Rubiks Cube with one hand?",
	answer1: "5 seconds",
	answer2: "10 seconds",
	answer3: "13 seconds",
	answer4: "16 seconds",
	correct: "10 seconds, with the left hand",
	solution: "answer2",
	image: "<img src=\"assets/images/leftyrecord.bmp\">",
};

var question6 = {
	question: "Question: Where is the biggest Rubiks Cube located?",
	answer1: "Budapest, Hungary",
	answer2: "Knoxville, Tennessee",
	answer3: "Austin, Texas",
	answer4: "Tokyo, Japan",
	correct: "Knoxville, Tennessee",
	solution: "answer2",
	image: "<img src=\"assets/images/lifesize.bmp\">",
};

var question7 = {
	question: "Question: How much is the most expensive cube ever produced worth?",
	answer1: "$1.5M",
	answer2: "$20M",
	answer3: "$275K",
	answer4: "$12K",
	correct: "$1.5M, the Master Cube features dozens of precious stones all set in 18-carat gold",
	solution: "answer1",
	image: "<img src=\"assets/images/mastercube.bmp\">",
};

//This array holds the question objects
var questionBank = [question1, question2, question3, question4, question5, question6, question7];

//This function ends the game and shows the final score
function endGame(){
	$("#question").html("Correct answers: "+wins);
	$("#image").html("Wrong answers: "+losses);
	$(".bspan").html("");
	$("#startbtn").html("<img src=\"assets/images/mrrubiks.jpg\">")
};

//This function picks a random question from the array and populates the HTML
function pickQuestion(){
	if (questionBank.length > 0){
		var i = Math.floor(Math.random()*questionBank.length)
		activeQuestion = questionBank[i];
		$("#question").html(questionBank[i].question);
		$("#answer1").html(questionBank[i].answer1);
		$("#answer2").html(questionBank[i].answer2);
		$("#answer3").html(questionBank[i].answer3);	
		$("#answer4").html(questionBank[i].answer4);
		questionBank.splice(i,1);
	} else {
		endGame();
	};
};

//This function checks the results of the game, shows the correct answer and starts a new game
function newGame(){

	//This collects the id from the button that was clicked
	var test = jQuery(this).attr("id");	

	//This checks the solution against the button clicked
	if (test === activeQuestion.solution){
		$("#question").html("Your correct, the answer is: "+activeQuestion.correct)
		wins++;
	} else {
		$("#question").html("Your wrong, the answer is: "+activeQuestion.correct)
		losses++;
	}

	//This clears the counter from the previous game
	clearInterval(x);

	//This adds the question image to the HTML
	$("#image").html(activeQuestion.image);
		
	//This counts down 4 seconds, while the answer is being displayed
	pause = 4;
	x = setInterval(function(){
 	pause--;

	//This ends counter at 0 and initiates the timer for the next game
	if (pause === 0){
	clearInterval(x);
	startTimer();
	}; 
	}, 1000);
};

//This initiates a new game based on each button click
$(document).on("click",".answerButtons",newGame);

//This function runs pickQuestion() and starts a new round
function startTimer(){

	//This clears the image div before each new game
	$("#image").html("")
	
	//This picks a new question
	pickQuestion()

	//This starts the timer
 	time = 30;
 	x = setInterval(function(){

 	//This displays the countdown
 	time --;
 	$("#heartbeat").html("Time remaining: "+time);

 	//This stops the countdown at 0:00
 	if (time === 0){
 		losses ++;
 		clearInterval(x);
 		newGame();
 	}
 	}, 1000);
};

//This button function initiates startTimer() and starts the very first game
$(".startgame").click(function(){
	startTimer();
	$("#startbtn").html("");
});

