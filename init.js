
//test and general data vars for quiz with utility functions

//data utility functions

function longerQuestions(questionSet) {
    //takes a default question set
    //returns set of concatenated values

  function reset(){

    //quote check
    if (outQuestion.includes('“') || outQuestion.includes('”')){
      // contains at least one quote character

      //worst case - step through every character and explicitly define status of question
      var left = 0;
      var right = 0;
      var openRight = false;
      var openLeft = false;
      var double = false;
      var complete = false;
      for (var i = 0; i < outQuestion.length; i++) {
        if(outQuestion[i] === '“'){
          //left
          left += 1;
          if (openRight) {
            //outlier, new quote starts without closing previous
            double = true;
          }
          else {
            //new quote started
            openRight = true;
          }
        }
        if(outQuestion[i] === '”'){
          //right
          right += 1;
          if (openRight) {
            //quote completed
            openRight = false;
            complete = true;
          }
          else {
            //question is mid-quote or missing a quote from middle
            if (complete) {
              // outlier, doubled
              double = true;
            }
            else {
              openLeft = true;
            }
          }
        }
      }
      if (openLeft && !double) {
        outQuestion = '“' + outQuestion; //prepend
      }
      if (openRight && !double) {
        outQuestion += '”'; //append
      }
    }

    out = new tupleQuestion(
      outQuestion,
      questionSet[sectionIndex].source,
      questionSet[sectionIndex].author,
      questionSet[sectionIndex].title
    );
    revisedSet.push(out);
    if(double){
      //outlier, has to be addressed in data set
      console.log(out);
      console.log([left,right,openRight,openLeft, double]);
    }
    sectionIndex = currentIndex;
    outQuestion = questionSet[sectionIndex].question;
  }

  //initial setup
  revisedSet = [];
  sectionIndex = 0;
  outQuestion = "";

  for (var currentIndex = 0; currentIndex < questionSet.length; currentIndex++) {
    // check each question for valid concatenation

    //handle title periods
    if (questionSet[currentIndex].question.endsWith("Dr.") ||
        questionSet[currentIndex].question.endsWith("Mr.") ||
        questionSet[currentIndex].question.endsWith("Mrs.") ||
        questionSet[currentIndex].question.endsWith("Ms.")
        ) {
          outQuestion += " ";
          outQuestion += questionSet[currentIndex].question;
          continue;
    }

    if(questionSet[sectionIndex].source !== questionSet[currentIndex].source){
      //reached new chapter, add value to new set and keep moving
      reset();
    }
    else if (outQuestion.length > 45) {
      //question over length of 45 characters, add value to new set and keep moving
      reset();
    }
    else {
      //valid addition, concatenate and keep moving
      outQuestion += " ";
      outQuestion += questionSet[currentIndex].question;

    }
  }
  return revisedSet;
}

// //list of datasets - serves as index - each tuple gets its own question variant
//   var all_questionSets = [
//     questionSet_zero,             // test questionSet
//     questionSet_one,              // #1
//     questionSet_two,              // #2
//     questionSet_three,            // #3
//     questionSet_four,             // #4
//     questionSet_five,             // #5
//     questionSet_six,              // #6
//     questionSet_seven,            // #7
//     questionSet_eight,            // #8
//     questionSet_nine,             // #9
//     questionSet_ten,              // #10
//     questionSet_eleven,           // #11
//     questionSet_twelve,           // #12
//     questionSet_thirteen         // #13
//   ];

//list of datasets - serves as index - multiple tuples per question variant
  var all_questionSets = [
    questionSet_zero,             // test questionSet
    longerQuestions(questionSet_one),              // #1
    longerQuestions(questionSet_two),              // #2
    longerQuestions(questionSet_two),              // #3
    longerQuestions(questionSet_four),             // #4
    longerQuestions(questionSet_five),             // #5
    longerQuestions(questionSet_six),              // #6
    longerQuestions(questionSet_seven),            // #7
    longerQuestions(questionSet_eight),            // #8
    longerQuestions(questionSet_nine),             // #9
    longerQuestions(questionSet_ten),              // #10
    longerQuestions(questionSet_eleven),           // #11
    longerQuestions(questionSet_twelve),           // #12
    longerQuestions(questionSet_thirteen)          // #13
  ];

//array of multiple choice ids for titles
  var mc_titles = [
    "title_blank",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20"
  ];

//array of multiple choice ids for authors
  var mc_authors = [
    "author_blank",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T"
  ];

//dictionary to map title refs to mc
  var dict_titles = {
    "title_blank":"----"
  };
//dictionary to map author refs to mc
  var dict_authors = {
    "author_blank":"----"
  };

// list of titles for random choices - TODO: check for duplicates each year

var title_choices = [
  "The Book of Three",
  "How Tia Lola Learned to Teach",
  "The True Blue Scouts of Sugar Man Swamp",
  "The One and Only Ivan",
  "Mr. Popper's Penguins",
  "The Wright 3",
  "El Deafo",
  "The Penderwicks: A Summer Tale of Four Sisters, Two Rabbits, and a Very Interesting Boy",
  "Doll Bones",
  "Code talker : A Novel About the Navajo Marines of World War Two",
  "The Fairy-Tale Detectives",
  "Lowriders in Space",
  "Floors",
  "The Year of the Book",
  "The Great Kapok Tree: A Tale of the Amazon Rain Forest",
  "Al Capone Does My Shirts",
  "Ralph S. Mouse",
  "Frindle",
  "No Talking",
  "Sahara Special",
  "The Magic School Bus Inside the Earth",
  "Gregor the Overlander",
  "Hate That Cat",
  "The Watsons go to Birmingham--1963",
  "Boy : Tales of Childhood",
  "The Lemonade War",
  "Salsa Stories",
  "The Miraculous Journey of Edward Tulane",
  "Out of My Mind",
  "The City of Ember",
  "Twelve Minutes to Midnight",
  "The Girl Who Could Fly",
  "The Great Little Madison",
  "What's the Big Idea, Ben Franklin?",
  "Diamond Willow",
  "Escape from Mr. Lemoncello's Library",
  "A Strong Right Arm: The Story of Mamie “Peanut” Johnson",
  "Football Genius",
  "The Million Dollar Shot",
  "The Old Willis Place: A Ghost Story",
  "Nathan Hale's Hazardous Tales: The Underground Abductor",
  "Misty of Chincoteague",
  "Hoot",
  "Paddle-To-The-Sea",
  "The Fourteenth Goldfish",
  "The Phantom Tollbooth",
  "Escaping the Giant Wave",
  "The Tail of Emily Windsnap",
  "Regarding the Fountain",
  "The View from Saturday",
  "Worth",
  "Inside Out and Back Again",
  "Where the Mountain Meets the Moon",
  "Little White Duck: A Childhood in China",
  "Fables",
  "The Polar Bear Scientists",
  "Fantasy League",
  "Miss Spitfire: Reaching Helen Keller",
  "Saving the Ghost of the Mountain: An Expedition among Snow Leopards in Mongolia",
  "The Quest for the Tree Kangaroo: An Expedition to the Cloud Forest of New Guinea",
  "Kensuke's Kingdom",
  "Blizzard! The Storm That Changed America",
  "Heart and Soul: The Story of America and African Americans",
  "How to Speak Cat: A Guide to Decoding Cat Language",
  "How to Speak Dog: A Guide to Decoding Dog Language",
  "The Borrowers",
  "Mrs. Frisby and the Rats of NIMH",
  "Wonder",
  "A Single Shard",
  "Dogs on Duty: Soldiers' Best Friends on the Battlefield and Beyond",
  "Lawn Boy",
  "My Life in Dog Years",
  "All of the Above",
  "A Long Way from Chicago: A Novel in Stories",
  "The Butterfly",
  "A Pizza the Size of the Sun",
  "Hothead",
  "Looking for Me",
  "Good Masters! Sweet Ladies!: Voices from a Medieval Village",
  "The Great Wall of Lucy Wu",
  "Baseball in April and Other Stories",
  "Call it Courage",
  "When You Reach Me",
  "Sound off! (The Adventures of Daniel Boom aka Loud Boy)",
  "My Life as a Book",
  "Team Moon: How 400,000 People Landed Apollo 11 on the Moon",
  "Candy Bomber: The Story of the Berlin Airlift's “Chocolate Pilot”",
  "The Frog Scientist",
  "Little House in the Big Woods",
  "Roberto Clemente: Pride of the Pittsburgh Pirates",
  "Stanford Wong Flunks Big-Time",

  // #1
  "[defaulttitle1]",
  // #2
  "[defaulttitle2]",
  // #3
  "[defaulttitle3]",
  // #4
  "[defaulttitle4]",
  // #5
  "[defaulttitle5]",
  // #6
  "[defaulttitle6]",
  // #7
  "[defaulttitle7]",
  // #8
  "[defaulttitle8]",
  // #9
  "[defaulttitle9]",
  // #10
  "[defaulttitle10]",
  // #11
  "[defaulttitle11]",
  // #12
  "[defaulttitle12]",
  // #13
  "[defaulttitle13]"
];

// list of authors for random choices - TODO: check for duplicates each year

var author_choices = [
  "Alexander, Lloyd",
  "Alvarez, Julia",
  "Appelt, Kathi",
  "Applegate, Katherine",
  "Atwater, Richard",
  "Balliett, Blue",
  "Bell, Cece",
  "Birdsall, Jeanne",
  "Black, Holly",
  "Bruchac, Joseph",
  "Buckley, Michael",
  "Camper, Cathy",
  "Carman, Patrick",
  "Cheng, Andrea",
  "Cherry, Lynne",
  "Choldenko, Gennifer",
  "Cleary, Beverly",
  "Clements, Andrew",
  "Codell, Esme Raji",
  "Cole, Joanna",
  "Collins, Suzanne",
  "Creech, Sharon",
  "Curtis, Christopher Paul",
  "Dahl, Roald",
  "Davies, Jacqueline",
  "Delacre, Lulu",
  "DiCamillo, Kate",
  "Draper, Sharon",
  "DuPrau, Jeanne",
  "Edge, Christopher",
  "Forester, Victoria",
  "Fritz, Jean",
  "Frost, Helen",
  "Grabenstein, Chris",
  "Green, Michelle Y",
  "Green, Tim",
  "Gutman, Dan",
  "Hahn, Mary Downing",
  "Hale, Nathan",
  "Henry, Marguerite",
  "Hiaasen, Carl",
  "Holling, Holling Clancy",
  "Holm, Jennifer L",
  "Juster, Norton",
  "Kehret, Peg",
  "Kessler, Liz",
  "Klise, Kate",
  "LaFaye, A",
  "Lai, Thanhha",
  "Lin, Grace",
  "Liu, Na",
  "Lobel, Arnold",
  "Lourie, Peter",
  "Lupica, Mike",
  "Miller, Sarah",
  "Montgomery, Sy",
  "Morpurgo, Michael",
  "Murphy, Jim",
  "Nelson, Kadier",
  "Newman, Aline Alexander",
  "Norton, Mary",
  "O'Brien, Robert C",
  "Palacio, R.J.",
  "Park, Linda Sue",
  "Patent, Dorothy Hinshaw",
  "Paulsen, Gary",
  "Pearsall, Shelley",
  "Peck, Richard",
  "Polacco, Patricia",
  "Prelutsky, Jack",
  "Ripken, Cal, Jr",
  "Rosenthal, Betsy R",
  "Schlitz, Laura Amy",
  "Shang, Wendy Wan",
  "Soto, Gary",
  "Sperry, Armstrong",
  "Stead, Rebecca",
  "Steinberg, David",
  "Tashjian, Janet",
  "Thimmesh, Catherine",
  "Tunnell, Michael O",
  "Turner, Pamela S",
  "Wilder, Laura Ingalls",
  "Winter, Jonah",
  "Yee, Lisa",


  // #1
  "[defaultauthor1]",
  // #2
  "[defaultauthor2]",
  // #3
  "[defaultauthor3]",
  // #4
  "[defaultauthor4]",
  // #5
  "[defaultauthor5]",
  // #6
  "[defaultauthor6]",
  // #7
  "[defaultauthor7]",
  // #8
  "[defaultauthor8]",
  // #9
  "[defaultauthor9]",
  // #10
  "[defaultauthor10]",
  // #11
  "[defaultauthor11]",
  // #12
  "[defaultauthor12]",
  // #13
  "[defaultauthor13]"
];

//array of author names
  var all_authors = [

    "----",          // no response

    // #1
    "[defaultauthor1]",
    // #2
    "[defaultauthor2]",
    // #3
    "[defaultauthor3]",
    // #4
    "[defaultauthor4]",
    // #5
    "[defaultauthor5]",
    // #6
    "[defaultauthor6]",
    // #7
    "[defaultauthor7]",
    // #8
    "[defaultauthor8]",
    // #9
    "[defaultauthor9]",
    // #10
    "[defaultauthor10]",
    // #11
    "[defaultauthor11]",
    // #12
    "[defaultauthor12]",
    // #13
    "[defaultauthor13]"
  ];

//array of book titles
  var all_books = [
    "----",        // no response

    // #1
    "[defaulttitle1]",
    // #2
    "[defaulttitle2]",
    // #3
    "[defaulttitle3]",
    // #4
    "[defaulttitle4]",
    // #5
    "[defaulttitle5]",
    // #6
    "[defaulttitle6]",
    // #7
    "[defaulttitle7]",
    // #8
    "[defaulttitle8]",
    // #9
    "[defaulttitle9]",
    // #10
    "[defaulttitle10]",
    // #11
    "[defaulttitle11]",
    // #12
    "[defaulttitle12]",
    // #13
    "[defaulttitle13]"
  ];
