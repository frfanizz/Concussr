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

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');

$("#newRecordBtn")[0].onclick = function() {
  recognition.start();
  console.log('Listening for numbers...');
}

$("#stopRecordBtn")[0].onclick = function() {
  recognition.stop();
  console.log('Done listening.');
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
    for (var i = 0; i < finals.length; i++) {
      var transcript = finals[i].transcript;
      var guess = transcript.replace(/[^0-9]/g, "").split('');
      var correct = document.getElementById("t1_solution").innerHTML.split('');
      submitSolution(correct, guess)
    }
  }
}

submitSolution = function(correct, guess) {
  console.log(lcsLength(correct, guess))
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}

// Longest common subsequence length
function lcsLength(trial, actual) {
    var s,i,j,m,n,
        lcs = [], row = [], c = [],
        left, diag, latch;
    //make sure shorter string is the column string
    if (trial < actual) {
        s = trial;
        trial = actual;
        actual = s;
    }
    m = trial.length;
    n = actual.length;
    //build the dynamic programming table
    for (j=0; j<n; j++) {
        row[j] = 0;
    }
    for (i=0; i<m; i++) {
        c[i] = row = row.slice();
        for (diag = 0, j = 0; j < n; j++, diag = latch) {
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
// TODO: test
