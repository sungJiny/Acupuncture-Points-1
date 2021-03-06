URL = window.URL || window.webkitURL;

var gumStream;                      //stream from getUserMedia()
var rec;                            //Recorder.js object
var input;                          //MediaStreamAudioSourceNode we'll be recording
var toggle = false;                 //Recorder toggle
var count = 0;                      //count the number of clicks, would be used for record stopper
var settime;

// shim for AudioContext when it's not avb.
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

var recordButton = document.getElementById("recordButton");

//add events to the toggle recording button
recordButton.addEventListener("click", toggleRecording);

function toggleRecording() {
    if (toggle == false) {
        toggle = true
        count += 1;
        console.log("recordButton clicked");

        var constraints = {audio: true, video: false}


        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

            audioContext = new AudioContext();


            /*  assign to gumStream for later use  */
            gumStream = stream;

            /* use the stream */
            input = audioContext.createMediaStreamSource(stream);

            /*
                Create the Recorder object and configure to record mono sound (1 channel)
                Recording 2 channels  will double the file size
            */
            rec = new Recorder(input, {numChannels: 1})
            //start the recording process
            rec.record()

            console.log("Recording started");

        }).catch(function (err) {
            //enable the record button if getUserMedia() fails
            // recordButton.disabled = false;
            // stopButton.disabled = true;
        });
        settime = setTimeout(function(){
            toggle = false;
            count += 1;
            console.log("stopButton clicked again");

            //tell the recorder to stop the recording
            rec.stop();

            //stop microphone access
            gumStream.getAudioTracks()[0].stop();

            //create the wav blob and pass it on to createDownloadLink
            rec.exportWAV(createDownloadLink);
        }, 5000); // timeout to record
    } else {
        toggle = false;
        count += 1;
        console.log("stopButton clicked");
        clearTimeout(settime);

        //tell the recorder to stop the recording
        rec.stop();

        //stop microphone access
        gumStream.getAudioTracks()[0].stop();

        //create the wav blob and pass it on to createDownloadLink
        rec.exportWAV(createDownloadLink);


    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function createDownloadLink(blob) {

    var url = URL.createObjectURL(blob);
    var link = document.createElement('a')

    //name of .wav file to use during upload and download (without extendion)
    var  filename = "recordedVoice"

    //save to disk link
    link.href = url;
    link.download = filename+".wav"; //download forces the browser to donwload the file using the  filename
    link.innerHTML = "Save to disk";

    //upload link
    var upload = document.createElement('a');
    upload.href="#";
    upload.innerHTML = "Upload";
    upload.addEventListener("click", function(event){
          var xhr=new XMLHttpRequest();
          xhr.onload=function(e) {
              if(this.readyState === 4) {
                  console.log("Server returned: ",e.target.responseText);
              }
          };
          var fd=new FormData();
          fd.append("audio_data",blob, filename);
          xhr.open("POST","/service",true);
          xhr.send(fd);
    })

    //add the feature to click upload link
    upload.click(upload.href);

    var gotoVoicePage = document.getElementById("goto-voice-page");
    //sleep for 2 seconds
    sleep(3000).then(() => {
        console.log("clicked goto-voice-page");
        gotoVoicePage.click();
    });

}