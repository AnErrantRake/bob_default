//quiz runtime and relevant functions
var quizSession;
var quizResponse;
var iteratorTimer;

//initial onload is to set up the quiz menu
window.onload = function() {
  //test sets
    // var bookChoices = [1,1,1,1,1,1,1,1,1,1,1,1,1,1]; //'all' books
    // var bookChoices = [0,1,1,1,1,1,1,1,1,1,1,1,1,1]; // all books selected
    // var bookChoices = [1,0,0,0,0,0,0,0,0,0,0,0,0,0]; // No books selected

    //initial choice init
    var bookChoices = [0,1,1,1,1,1,1,1,1,1,1,1,1,1];

    //Add a choice list for selecting the Books
    var checklistList = document.getElementById("mainMenu");
    //loop through all_titles, create checkbox for each
    //start at one to avoid the zero entry
    for (var i = 1; i < all_books.length; i++) {
      // checkbox element
      var checkbox_div = document.createElement("div");
      // text for checkbox
      var text = document.createElement("input");
      //checkbox params
        text.type = "checkbox";
        // disallow test data
        if(i === 0){
          //disallowed titles
          text.checked = false;
          text.disabled="disabled";
        }
        else {
          text.checked = true; //all valid are checked by default
        }
        text.id = "titles_choices_" + i;
      //add text for title
      var checkbox_label = document.createTextNode(all_books[i]);

      //update page
      checkbox_div.appendChild(text);
      checkbox_div.appendChild(checkbox_label);
      checklistList.appendChild(checkbox_div);
    }

    var flag_grade = false;
    var optionList = [bookChoices, false, -1,-1,false,0,-1,0,false,false,false];

    //to be called once the quiz parameters have been applied
    document.getElementById("cmd_start_quiz").onclick =
      function(e){

        //loop through all values in titles_choices_X and update the bookchoices
        for (var i = 1; i < all_books.length; i++) {
          //skip first value
          var input_id = "titles_choices_" + i;
          var checkbox = document.getElementById(input_id).checked;
          if(checkbox){
            bookChoices[i] = 1;
          }
          else{
            bookChoices[i] = 0;
          }
        }

        optionList = updateOptions(bookChoices);

        quizSession = new quiz_session(optionList);
        quizSession.chooseQuestion();
        console.log(quizSession.currentQuestion); //correct answer

        quizTime();
        mcSetup(refSetup(genChoices(bookChoices)));

        // question init
        if (quizSession.questionType) {
          document.getElementById("qSpeaker").style.display = "block";
          document.getElementById("qBlock").style.display = "none";
        }
        else {
          question = element_bs_block("qBlock", quizSession.currentQuestion.question,"questions",true);
        }


        if (quizSession.questionTimer > 0) {
          updateTimer(quizSession.questionTimer,false,"question");
        }

        //question speech
        if (quizSession.generalSound) {
            speak_question(quizSession.currentQuestion.question);
        }
      };


    //action when user clicks "Submit Answer"
    document.getElementById("submit").onclick =
      function(e){
          flag_grade = true;
          resultsSetup();

        };

    //action when user clicks "Generate New Question"
    document.getElementById("newQuestion").onclick =
      function(e){

        // question history
        if(flag_grade){
          updateHistory();
        }
        flag_grade = false;

        newQuestionSetup();
      };

      //reset the quiz
      document.getElementById("reset_quiz").onclick =
        function(e){
          location.reload();
        };

      document.getElementById("history_button").onclick =
        function(e){
          if (document.getElementById("history").style.display === "block") {
            document.getElementById("history").style.display = "none";
          }
          else {
            document.getElementById("history").style.display = "block";
          }
        }

      document.getElementById("option_button").onclick =
        function(e){
          if (document.getElementById("options").style.display === "block") {
            document.getElementById("options").style.display = "none";
          }
          else {
            document.getElementById("options").style.display = "block";
          }
        }
};
