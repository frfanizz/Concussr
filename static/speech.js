var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var numbers = [ 'one' , 'two' , 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'zero'];
var grammar = '#JSGF V1.0; grammar numbers; public <numbers> = ' + numbers.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

$("#newRecordBtn")[0].onclick = function() {
  recognition.start();
  console.log('Listening for numbers...');
  $("#recordBtn")[0].onclick = stopRecording
  $("#recordBtn")[0].textContent = "End Test"
}

$("#stopRecordBtn")[0].onclick = function() {
  recognition.stop();
  console.log('Done listening.');

  $("#recordBtn")[0].onclick = startRecording
  $("#recordBtn")[0].textContent = "Start Test"
}

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The [last] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object

  var last = event.results.length - 1;
  var color = event.results[last][0].transcript;

  finals = event.results[event.results.length - 1]

  if (finals.isFinal) {
    var transcript = finals[0].transcript;
    var guess = transcript.replace(/[^0-9]/g, "").split('');
    var solution = document.getElementById("t" + current_test + "_solution").innerHTML
    var correct = solution.split('');
    submitSolution(correct, guess)
  }
}

submitSolution = function(correct, guess) {
  var score = lcsLength(correct, guess)
  console.log(score)
  if (!score) {
      score = 0;
  }
  total_score += score

  $(".t" + current_test + "_display").css('display', 'none')

  if (current_test != total_tests) {
    current_test += 1
    $(".t" + current_test + "_display").css('display', 'inline-block')
  }
}

recognition.onnomatch = function(event) {
  // TODO
  // TONOTTODO
}

recognition.onerror = function(event) {
  // TODO
  // TONOTTODO
}

// Longest common subsequence length
function lcsLength(trial, actual) {
    var s,i,j,
        lcs = [], row = [], c = [],
        left, diag, latch;
    //make sure shorter string is the column string
    if (trial < actual) {
        s = trial;
        trial = actual;
        actual = s;
    }
    //build the dynamic programming table
    for (j=0; j<actual.length; j++) {
        row[j] = 0;
    }
    for (i=0; i<trial.length; i++) {
        c[i] = row = row.slice();
        for (diag = 0, j = 0; j < actual.length; j++, diag = latch) {
            latch = row[j];
            if(trial[i] == actual[j]) {
                row[j] = diag+1;
            } else {
                left = row[j-1] || 0;
                if (left>row[j]) {
                    row[j] = left;
                }
            }
        }
    }
    return row[--j];
}

var current_test = 1;
var total_tests = 2;
var total_time = 0;
var total_score = 0;
var total_numbers = 40 * total_tests;
