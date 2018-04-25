
//a bootstrap create SELECT function
function element_bs_select(id,options,parent){
  var element = document.getElementById(id);
  for (var i = 0; i < options.length; i++) {
    var option = document.createElement("option");
    option.text = options[i];
    option.value = i;
    element.appendChild(option);
  }
  var out = document.getElementById(parent);
  out.appendChild(element);
}

//a bootstrap create BLOCKquote function
function element_bs_block(id,options,parent,bool_static){
  var element = document.getElementById(id);
  var quote = document.createTextNode(options);

  //static size for main question block - reduces shift of input buttons
  if(bool_static){
  element.setAttribute("style","height: 150px");
  }

  while (element.hasChildNodes()) {
    element.removeChild(element.childNodes[0]);
  }
  element.appendChild(quote);

  var out = document.getElementById(parent);
  out.appendChild(element);
}

//a bootstrap create progress bar function
function element_pb_block(id,correct,total,parent){
  var element = document.getElementById(id);
  var pb_main = document.createElement("div");
  while ( element.hasChildNodes()) {
     element.removeChild(element.childNodes[0]);
  }
  var pb_correct = document.createElement("PROGRESS");
  pb_correct.setAttribute("value", (quizSession.stats.percentage(correct,total)).toString());
  pb_correct.setAttribute("max","100");
  pb_main.appendChild(pb_correct);

  element.appendChild(pb_main);

  var out = document.getElementById(parent);
  out.appendChild(element);
}
