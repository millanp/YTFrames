/*
WORKFLOW: 
1. User clicks the extension icon to activate the listeners
2. User enters Ctrl-Q, then types in the class name
3. User clicks to a frame, hits tilde to download, continues on until entire pass is done
4. Repeat steps 2-3
*/
var videoElem;
var prevTime = 0;
var framesPerJump;
var secondsPerFrame;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "start") {
            console.log("start me up");
            setFramesPerJump()
            videoElem = document.querySelector('video');
            setClass();
            prevTime = videoElem.currentTime;
            $('.ytp-progress-bar').click(function() {
                prevTime = videoElem.currentTime;
                console.log('reset prevtime');
            });
            $(document).keydown(function(e) {
                if (e.which === 81 && e.ctrlKey) {
                    // Ctrl+q was pressed
                    setClass();
                } else if (e.which === 190 || e.which === 188) {
                    // period or comma was pressed
                    if (!secondsPerFrame) {
                        var timeSkip = videoElem.currentTime - prevTime;
                        secondsPerFrame = Math.abs(timeSkip);
                    }
                    if (e.which === 190) {
                        videoElem.currentTime = prevTime + secondsPerFrame * framesPerJump;
                    } else {
                        videoElem.currentTime = prevTime - secondsPerFrame * framesPerJump;
                    }
                    prevTime = videoElem.currentTime;
                } else if (e.which === 16) {
                    // shift was pressed
                    if (secondsPerFrame) {
                        downloadCurrentFrame(videoElem);
                    } else {
                        alert("Please press '.' or ',' at least once to establish your current frame number");
                    }
                } else if (e.which === 70 && e.ctrlKey && e.altKey) {
                    // Ctrl+alt+f was pressed
                    setFramesPerJump();
                }
            });
        } else if (request.action == "stop") {

        }
    }
);

function setFramesPerJump() {
    var tmp = parseInt(prompt("Frames to jump: "));
    if (tmp) {
        framesPerJump = tmp;
    }
}

function setClass() {
    var nextClass = prompt("Next class:");
    if (nextClass) {
        chrome.runtime.sendMessage({ action: "setClass", class: nextClass });
    }
}

function downloadCurrentFrame(video) {
    var canvas = document.createElement('canvas');
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    chrome.runtime.sendMessage({
        action: "download",
        dataURL: canvas.toDataURL(),
        frameNumber: getCurrentFrame()
    });
}

function getCurrentFrame() {
    return Math.ceil(videoElem.currentTime / secondsPerFrame);
}