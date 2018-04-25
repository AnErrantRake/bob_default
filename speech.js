
//global speech vars
var voice = new p5.Speech();
var voiceTimer_1;
var voiceTimer_2;

function speak_question(question){
  var voiceList = [
    'Microsoft Anna - English (United States)',
    'Google US English',
    'Google UK English Female',
    'Google UK English Male'
  ]
  voice.cancel();
  window.clearTimeout(voiceTimer_1);
  window.clearTimeout(voiceTimer_2);
  voice.interrupt = true;

  index = Math.floor(Math.random() * 10) % 4;
  voice.setVoice(voiceList[index]);

  // one second delay to allow voice time to change
  voiceTimer_1 = window.setTimeout(
    function(x){
      voice.speak(question);
      // read twice
      voiceTimer_2 = window.setTimeout(
        function(x)
        {
          voice.interrupt = false;
          voice.speak(question);
        }
        ,4000);
    }
    ,1000);
}
