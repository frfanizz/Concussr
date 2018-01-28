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

startRecording = function() {
  start_time = (new Date()).getTime()
  recognition.start();
  console.log('Listening for numbers...');

  $("#recordBtn")[0].onclick = stopRecording
  $("#recordBtn")[0].textContent = "Stop recording"
}

stopRecording = function() {
  total_time += (new Date()).getTime() - start_time;
  recognition.stop();
  console.log('Done listening');

  $("#recordBtn")[0].onclick = startRecording
  $("#recordBtn")[0].textContent = "Start recording"
}

$("#recordBtn")[0].onclick = startRecording;

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
  total_score += score

  $(".t" + current_test + "_display").css('display', 'none')

  if (current_test != total_tests) {
    current_test += 1
    $(".t" + current_test + "_display").css('display', 'inline-block')
  } else {
    $("#recordBtn").css('display', 'none')
    $("#results").css('display', 'inline-block')
    $("#totalTime")[0].textContent = "Total time: " + (total_time / 1000) + " seconds"
    $("#totalCorrect")[0].textContent = "Total correct: " + total_score + "/" + total_numbers
  }
}

recognition.onnomatch = function(event) {
  // TODO
}

recognition.onerror = function(event) {
  // TODO
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
    n = actual.length; //build the dynamic programming table
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

var start_time = 0;
var current_test = 1;
var total_tests = 2;
var total_time = 0;
var total_score = 0;
var total_numbers = 40 * total_tests;
