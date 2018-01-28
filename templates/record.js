


// HTML audio element
var player = document.getElementById('htmlAudioElement');

// On handling successful receipt of user's audio recorder
var handleSuccess = function(stream) {
    // Show test text, begin timer, begin recording



    
    if (window.URL) {
        player.src = window.URL.createObjectURL(stream);
    } else {
        player.src = stream;
    }
};

// Tries to get user's audio recording device
navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(handleSuccess);