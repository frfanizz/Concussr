
var AvailableNumbers = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
 
$(document).ready(function (window) {
    var isRecording = false;
    // var isBusy = false;
    var startTime, endTime, elapsedTime;
    document.getElementById("recordBtn").onclick = function(oClick) {
        // isBusy = true;
        if (!isRecording) {
            isRecording = true;
            // Start recording speech
            // TODO:
            // Display test text
            // TODO:
            // Start timer
            startTime = new Date();
            // Change button to end timer
            oClick.path[0].textContent = "End test";
        } else {
            isRecording = false;
            // End timer
            endTime = new Date();
            // Disable Button
            oClick.path[0].textContent = "Test Over";
            oClick.path[0].disabled = true;
            elapsedTime = (endTime - startTime)/1000;
            document.getElementById("testResults").textContent = "Elapsed time = " + elapsedTime + " seconds";
        }
        
    };

})