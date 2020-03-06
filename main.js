

const QUESTION = [
        //Entry 0 - dataStore[0]
   {
     questionText: "Flying Circus became one of televisions most influential comedy series after making its premiere on October 5 of what year?",
     answers: [
       "1968",
       "1969",
       "1978",
       "1979"
     ],
     correctAnswer: "1969"
   },   //Entry 1 - dataStore[1]
   {
      questionText: "Monty Python used the choreographer Arlene Phillips who also did the choreography for this feature film:",
      answers: [
        "Hairspray",
        "Annie",
        "Grease",
        "Caberet"
        ],
      correctAnswer: "Annie"
   }, //Entry 2 - dataStore[2]
    {
      questionText: "For their TV show ,Flying Circus, the BBC had many title choices but not this one:",
        answers: [
          "The Toad Elevating Moment",
          "Owl Stretching Time",
          "Lucifer and His Heavy Foot",
          "The Algy Banging Hour"
        ],
      correctAnswer: "Lucifer and His Heavy Foot"
    }, //Entry 3 - dataStore[3]
    {
      questionText: "The Python troup chose The Liberty Bell, by John Philip Souza, as their theme song because...",
        answers: [
          "It was a favorite of John Cleese",
          "It was free under public domain",
          "Terry Jones owned the rights to it",
          "The Queen requested it"
        ],
      correctAnswer: "It was free under public domain"
    }, //Entry 4 - dataStore[4]
    {
      questionText: "The giant foot in the open credits of The Flying Circus belong to:",
        answers: [
          "Lucifer",
          "Queen Elizabeth",
          "Cupid",
          "Zues"
        ],
      correctAnswer: "Cupid"
    }, //Entry 5 - dataStore[5]
    {
      questionText: "John Cleese left the Flying Circus after which season:",
        answers: [
          "season 2",
          "season 3",
          "season 4",
          "season 5"
        ],
      correctAnswer: "season 4"
    }, //Entry 6 - dataStore[6]
    {
      questionText: "A test sreening was held in New York for the film, The Meaning of Life, and had over 80 percent high school kids in the audience. The majority of them walked out in disgust giving the film a reputation of the most negative respose EVER at a screening among Hollywood:",
        answers: [
          "True",
          "False",
          "Maybe",
          "That was never a title"
        ],
      correctAnswer: "True"
    }, //Entry 7 - dataStore[7]
    {
      questionText: "The Pythons did almost ALL of their own stunts.",
        answers: [
          "True",
          "False",
          "Maybe",
          "There were no stunts"
        ],
      correctAnswer: "True"
    }, //Entry 8 - dataStore[8]
    {
      questionText: " John Cleese to this day HATES the troupe and refuses to talk about why he broke all ties with them.",
        answers: [
          "True",
          "False",
          "Only half",
          "Cleese was never in the Python troupe."
        ],
      correctAnswer: "False"
    }, //Entry 9 - dataStore[9]
    {
      questionText: "Milligans first TV show before, Flying Circus, was:",
        answers: [
          "Q5",
          "The Monkeys",
          "Dr Who",
          "Doc Martin"
        ],
      correctAnswer: "Q5"
    }
  ];

//Variables declared
  let questionNumber = 0;
  let score = 0;
  let totalQuestionNumber = QUESTION.length;


function renderQuestion () {
  $('#content').html(generateQuestion());
}

//Generate HTML within the 'content' div from QUESTION array
function generateQuestion () {
  if (questionNumber < QUESTION.length) {
    return `<div class="content-${questionNumber}">
    <h2>${QUESTION[questionNumber].questionText}</h2>
    <form id = "formContent">
      <fieldset><legend>Pick one:</legend>
    <label class="answerOption">
    <input type="radio" value="${QUESTION[questionNumber].answers[0]}" name="answer" required>
    <span>${QUESTION[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${QUESTION[questionNumber].answers[1]}" name="answer">
    <span>${QUESTION[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${QUESTION[questionNumber].answers[2]}" name="answer">
    <span>${QUESTION[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${QUESTION[questionNumber].answers[3]}" name="answer">
    <span>${QUESTION[questionNumber].answers[3]}</span>
    </label><br>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset></form>
    </div>`;
} else {
    renderResults();
  }
}
//Begin the quiz with a button click
//hide the intro splash
//show the content question with a head score
function handleStartQuiz () {
  $('#intro').on('click', '.submit', function (event) {
    $('#intro').hide();
    renderQuestion();
    $('#content').show();
    $('.questionNumber').text(questionNumber+1);
    $('.totalQuestionNumber').text(totalQuestionNumber);
    $('#feedback').show();

});
}

//Create feedback content dependant on if answer is correct or not
function displayFeedback(message) {
  var feedbackHTML = `${message}
  <div id="continueButton"><button type = "submit" class = "feedbackButton">Continue</button></div>`;
  $('#content').html(feedbackHTML);
}
//incrementation of question number
function handleFeedbackSubmit() {
  $('#content').on('click', '.feedbackButton', function (event){
     event.preventDefault();
     if(questionNumber < QUESTION.length) {
     //increment question questionNumber
     questionNumber++;
     $('.questionNumber').text(questionNumber+1);
   }
     renderQuestion();
  });
 }

function handleQuestionSubmit() {
  $('#content').on('submit', '#formContent', function (event){
     event.preventDefault();
    //Check correct answer
    //Get answer value from form
    let answer = $("input[name='answer']:checked").val();
    //if question correct answer == value from form
    if(answer == QUESTION[questionNumber].correctAnswer) {
      //increment score
      score++;
      //update score on screen
      $('.score').text(score);
      //print positive feedback to user
      displayFeedback("Good Job! I don't care what anybody says...you aint stupid!");
    } else {
      //print negative feedback alert
      //print correct answer feedback
      displayFeedback("In life there are winners and losers...I\'m sorry your a loser!  The correct answer is: " + `${QUESTION[questionNumber].correctAnswer}`);
    };
  });
}

//process results score and question questionNumber
function renderResults() {
    $('#content').html(generateResults());
 }

function generateResults(){
  $("#feedback").hide();
  //if score < 5 :  message
  //else message 2
  let message;
  if(score < (QUESTION.length/2)) {
    message = "dumb ass";
  }else{
    message = "smart ass";
  }
  //display score,display message,restart quiz button
  return `<div class = "summaryPage"><h1>Let\'s see how you did!</h1>
  <p>your score is:  ${score} out of ${QUESTION.length}</p>
  <p>This makes you a ${message}</p>
  <button type="submit" class="restartButton">Restart Quiz</button></div>`;
};

function restartButton() {
 $('#content').on('click', '.restartButton', function (event){
     event.preventDefault();
     //reset variables questionNumber and score
     //show intro
     $('#intro').show();
     $('#content').hide();
     //hide header
     $('#feedback').hide();
     //empty content div
    // $("#formContent").reset();
    // $(".main").reset();
     $('input').val('').removeAttr('checked').removeAttr('selected');
     location.reload(true);
 });
}

function regEventListeners(){
  $('#feedback').hide();
  handleStartQuiz();
  handleQuestionSubmit();
  handleFeedbackSubmit();
  restartButton();
}

$(regEventListeners);
