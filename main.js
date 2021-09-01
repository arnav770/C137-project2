status = "";
video = "";
objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    objectname = document.getElementById("objectName").value;
}

function modelLoaded() {
    console.log("modelLoaded");
    status = true;
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "") {
        objectDetector.detect(video, gotresult);
        for (i = 0; i < objects.length; i++) {
            r = random(255);
            g = random(255);
            b = random(255);
            document.getElementById("status").innerHTML = "Status : Object detected";

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == objectname) {
                video.stop();
                objectDetector.detect(gotresult);
                document.getElementById("objectStatus").innerHTML = objectname + " Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(objectname + "Found");
                synth.speak(utterThis);
            }

            else {
                document.getElementById("objectStatus").innerHTML = objectname + " not found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(objectname + "not found");
                synth.speak(utterThis);
            }
        }
    }
}

function gotresult(error,results) {
    if(error) {
        console.error(error);
    }

    console.log(results);
objects = results;
}