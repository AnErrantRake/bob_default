function updateOptions(bookChoices){
  var questionType = false;   // true is spoken, false is text
  if (document.getElementById("questionType1").checked) {
    questionType = false;
  }
  if (document.getElementById("questionType2").checked) {
    questionType = true;
  }

  //manual/unintelligent values
  var questionCount = -1;  // integer value, -1 is infinite
  if (document.getElementById("questionCount1").checked) {
    questionCount = -1;
  }
  if (document.getElementById("questionCount2").checked) {
    questionCount = 25;
  }
  if (document.getElementById("questionCount3").checked) {
    questionCount = 35;
  }
  if (document.getElementById("questionCount4").checked) {
    questionCount = 50;
  }
  console.log(questionCount + " questions");

  var questionTimer = -1;  // integer value, -1 is no timer
  if (document.getElementById("questionTimer1").checked) {
    questionTimer = -1;
  }
  if (document.getElementById("questionTimer2").checked) {
    questionTimer = 15;
  }
  if (document.getElementById("questionTimer3").checked) {
    questionTimer = 30;
  }
  if (document.getElementById("questionTimer4").checked) {
    questionTimer = 45;
  }

  var questionRepeat = false; // false is no repeated values, true allows repeats
  if (document.getElementById("questionRepeat1").checked) {
    questionRepeat = true;
  }
  if (document.getElementById("questionRepeat2").checked) {
    questionRepeat = false;
  }

  var answerType = 3;      // 0 no details, 1 is a break, 2 correct/incorrect, 3 is full
  if (document.getElementById("answerType1").checked) {
    answerType = 0;
  }
  if (document.getElementById("answerType2").checked) {
    answerType = 1;
  }
  if (document.getElementById("answerType3").checked) {
    answerType = 2;
  }
  if (document.getElementById("answerType4").checked) {
    answerType = 3;
  }

  var answerTimer = -1;    // integer value, -1 is no timer
  if (document.getElementById("answerTimer1").checked) {
    answerTimer = -1;
  }
  if (document.getElementById("answerTimer2").checked) {
    answerTimer = 5;
  }
  if (document.getElementById("answerTimer3").checked) {
    answerTimer = 15;
  }
  if (document.getElementById("answerTimer4").checked) {
    answerTimer = 30;
  }

  //no plans to implement
  var answerInput = 0;    // 0 MC, 1 write-in, 2 MC w/ chapter, 3 write-in w/ chapter

  var generalSound = true;       // false no sound, true has sound
  if (document.getElementById("generalSound1").checked) {
    generalSound = true;
  }
  if (document.getElementById("generalSound2").checked) {
    generalSound = false;
  }

  var generalProgressBar = true; // false no bar, true has bar
  if (document.getElementById("generalProgressBar1").checked) {
    generalProgressBar = true;
  }
  if (document.getElementById("generalProgressBar2").checked) {
    generalProgressBar = false;
  }

  var generalTimer = false;      // false timer not displayed, true timer displayed
  if (document.getElementById("generalTimer1").checked) {
    generalTimer = true;
  }
  if (document.getElementById("generalTimer2").checked) {
    generalTimer = false;
  }

  return [bookChoices, questionType, questionCount,questionTimer,questionRepeat,answerType,answerTimer,answerInput,generalSound,generalProgressBar,generalTimer];
}

function quizTime(){
//static blocks
  document.getElementById("titleRef").style.display = "block";
  document.getElementById("authorRef").style.display = "block";
  document.getElementById("reset_quiz").style.display = "block";
  document.getElementById("qBlock").style.display = "block";
  document.getElementById("history_button").style.display = "block";
  if (quizSession.generalTimer) {
    document.getElementById("timer").style.display = "block";
  }

//input block
  document.getElementById("titleSelect").style.display = "block";
  document.getElementById("authorSelect").style.display = "block";
  document.getElementById("submit").style.display = "block";
  document.getElementById("newQuestion").style.display = "block";


//hide menu elements
  document.getElementById("mainMenu").style.display = "none";
  document.getElementById("cmd_start_quiz").style.display = "none";
  document.getElementById("options").style.display = "none";
  document.getElementById("option_button").style.display = "none";
}

function genChoices(bookChoices){

  var titleOrder = [];
  //add required values
  for (var i = 0; i < all_books.length; i++) {
    if (bookChoices[i]>0) {
      titleOrder.push(all_books[i]);
    }
  }
  //fill with wrong answers
  while (titleOrder.length < 20) {
    var value = title_choices[Math.floor(Math.random()*title_choices.length)];
    if(titleOrder.indexOf(value) > -1){
      continue;
    }
    titleOrder.push(value);
  }
  //shuffle via Fisher-Yates algo - JS implementation via https://bost.ocks.org/mike/shuffle/
  var m = titleOrder.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = titleOrder[m];
    titleOrder[m] = titleOrder[i];
    titleOrder[i] = t;
  }


  var authorOrder = [];
  //add required values
  for (var i = 0; i < all_books.length; i++) {
    if (bookChoices[i]>0) {
      authorOrder.push(all_authors[i]);
    }
  }
  //fill with wrong answers
  while (authorOrder.length < 20) {
    var value = author_choices[Math.floor(Math.random()*author_choices.length)];
    if(authorOrder.indexOf(value) > -1){
      continue;
    }
    authorOrder.push(value);
  }
  // shuffle via Fisher-Yates algo - JS implementation via https://bost.ocks.org/mike/shuffle/
  var m = authorOrder.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = authorOrder[m];
    authorOrder[m] = authorOrder[i];
    authorOrder[i] = t;
  }

  return [titleOrder,authorOrder];
}

function refSetup(order){
  var titleRef = document.getElementById("ref_titles");
  var authorRef = document.getElementById("ref_authors");

  var tableTitle = document.createElement("table");
  tableTitle.className = "table-condensed table-responsive";
  var trTitle = document.createElement("tr");
  tableTitle.appendChild(trTitle);
  var tdTitle = document.createElement("td");
  tdTitle.className = "h6 small";

  countTitles = 0;
  for (var i = 0; i < order[0].length; i++) {
      countTitles += 1;

      dict_titles[mc_titles[countTitles]] = order[0][i];
      //write to title ref block
      newline = mc_titles[countTitles] + ". " + order[0][i];
      var node = document.createTextNode(newline);
      tdTitle.appendChild(node);
      tdTitle.appendChild(document.createElement("br"));
  }
  tdTitle.appendChild(document.createElement("br"));
  tableTitle.appendChild(tdTitle);

  var tableAuthor = document.createElement("table");
  tableAuthor.className = "table-condensed table-responsive";

  var trAuthor = document.createElement("tr");
  tableAuthor.appendChild(trAuthor);
  var tdAuthor = document.createElement("td");
  tdAuthor.className = "h6 small";

  countAuthors = 0;
  for (var i = 0; i < order[1].length; i++) {
      countAuthors += 1;

      dict_authors[mc_authors[countAuthors]] = order[1][i];

      //write to author ref block
      newline = mc_authors[countAuthors] + ". " + order[1][i];
      var node = document.createTextNode(newline);
      tdAuthor.appendChild(node);
      tdAuthor.appendChild(document.createElement("br"));
  }
  tdAuthor.appendChild(document.createElement("br"));
  tableAuthor.appendChild(tdAuthor);

  titleRef.appendChild(tableTitle);
  authorRef.appendChild(tableAuthor);

  return [countTitles,countAuthors];
}

function mcSetup(bookCount){
  for (var i = bookCount[0]+1; i < mc_titles.length; i++) {
    document.getElementById(mc_titles[i]).style.display = "none";
  }
  for (var i = bookCount[1]+1; i < mc_authors.length; i++) {
    document.getElementById(mc_authors[i]).style.display = "none";
  }
}

function resultsSetup(){

  //generate response tuple
  quizResponse = quizSession.readResponse("answers_titles","answers_authors");
  //grade response and update stats
  grade = quizSession.gradeResponse(quizResponse);
  console.log(grade);
  //print raw score
  percentage = quizSession.stats.percentage(grade[0],grade[1]);
  if (percentage < 50){
    //Didn't pass
    divclassstr = "alert alert-danger";
    gradetext = "You <b>missed</b> this one. Your score was " + percentage + "%.";
    shortgradetext = percentage + "%";
  }
  if (percentage === 50){
    //Partial Credit
    divclassstr = "alert alert-success";
    gradetext = "<b>You got the title right!</b> Your score was " + percentage + "%.";
    shortgradetext = percentage + "%";
  }
  if (percentage > 50){
    //Passed
    divclassstr = "alert alert-success";
    gradetext = "<b>You got it right!</b> Your score was " + percentage + "%.";
    shortgradetext = percentage + "%";
  }

  //generate answer sheet from grade and quiz session here
  var answer = "<div class='alert alert-info'>";
  answer += "<b> \""
  answer += quizSession.currentQuestion.title;
  answer += "\"<br>"
  answer += quizSession.currentQuestion.author;
  answer += "</b>"
  answer += "<br>";
  answer += quizSession.currentQuestion.source;
  answer += "</div>";

  document.getElementById("titleSelect").style.display = "none";
  document.getElementById("authorSelect").style.display = "none";
  document.getElementById("submit").style.display = "none";

if (quizSession.answerType === 0) {
  //no feedback or break
  newQuestionSetup();
}
else if (quizSession.answerType === 1) {
  //just a break between questions
}
else if (quizSession.answerType === 2){
  //just correct or incorrect
  document.getElementById("answerBlock").innerHTML = gradetext;
  document.getElementById("answerBlock").style.display = "block";
}
else {
  //display full feedback
  document.getElementById("answerBlock").innerHTML = answer;
  document.getElementById("answerBlock").innerHTML += "<div class='" + divclassstr + "'>" + gradetext + "</div>";
  document.getElementById("answerBlock").style.display = "block";
}
  //original stats
  var print_current_stats = quizSession.stats.points + " out of " + quizSession.stats.pointsMax + " (" + quizSession.stats.percentageTotal + "%)";
  statistics_block = element_bs_block("statistics_block_1", print_current_stats,"score",false);

  //experiment stats view
  statistics_exp_block = element_pb_block("statistics_block_2", quizSession.stats.points, quizSession.stats.pointsMax,"score");

  //original stats
  var print_current_stats = "Total Questions: " + quizSession.stats.questionCount;
  statistics_block = element_bs_block("statistics_block_3", print_current_stats,"score",false);


  if (quizSession.generalProgressBar) {
    document.getElementById("score").style.display = "block";
  }

  if (quizSession.answerTimer > 0) {
    updateTimer(quizSession.answerTimer,false,"answer");
  }
}

function updateHistory(){
  //generate history of answered questions
  var answer = "<div class='alert alert-info'>";
  answer += quizSession.currentQuestion.question;
  answer += "<br><b>\""
  answer += quizSession.currentQuestion.title;
  answer += "\" - ";
  answer += quizSession.currentQuestion.author;
  answer += "</b>"
  answer += " - ";
  answer += quizSession.currentQuestion.source;
  answer += " ";
  answer += "<span class='badge'>" + gradetext + "</span>";
  answer += "";
  answer += "</div>";
  document.getElementById("history").innerHTML += answer;
}

function newQuestionSetup(){

  //get a new question
  quizSession.chooseQuestion();
  console.log(quizSession.currentQuestion); //correct answer

  //update question text
  if (!quizSession.questionType) {
    question = element_bs_block("qBlock", quizSession.currentQuestion.question,"questions",true);
  }

  //question speech
  if (quizSession.generalSound) {
      speak_question(quizSession.currentQuestion.question);
  }

  // reset select lists
  // check elements for title
  for (var i = 0; i < mc_titles.length; i++) {
    var responseNode = document.getElementById(mc_titles[i]);
    if(responseNode.classList.contains("active")){
      responseNode.classList.remove("active");
      break;
    }
  }
  document.getElementById(mc_titles[0]).classList.add("active");

  // check elements for author
  for (var i = 0; i < mc_authors.length; i++) {
    var responseNode = document.getElementById(mc_authors[i]);
    if(responseNode.classList.contains("active")){
      responseNode.classList.remove("active");
      break;
    }
  }
  document.getElementById(mc_authors[0]).classList.add("active");

  // reset display to question layout
  document.getElementById("answerBlock").style.display = "none";
  document.getElementById("titleSelect").style.display = "block";
  document.getElementById("authorSelect").style.display = "block";
  document.getElementById("submit").style.display = "block";

  if (quizSession.questionTimer > 0) {
    updateTimer(quizSession.questionTimer,false,"question");
  }
}

function updateTimer(seconds, kill, type){
  clearInterval(iteratorTimer);
  if(kill){
    clearInterval(iteratorTimer);
    document.getElementById("time").innerHTML = "---";
    switch (type) {
      case "question":
        resultsSetup(true); //show results
        break;
      case "answer":
      console.log("break 1")
        newQuestionSetup();  //load next question
        break;
      case "manual":
        break;
      default:

    }
  }
  else {
    iteratorTimer = setInterval(function(){
      document.getElementById("time").innerHTML = seconds;
      seconds = seconds - 1;
      console.log(seconds);
      if (seconds < 0) {
        updateTimer(0,true,type);
      }
    }, 1000)
  }
}
