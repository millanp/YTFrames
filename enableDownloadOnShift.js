// ssecondsPerFrame is defined in content.js
function enableDownloadOnShift() {
    var videoElem = document.querySelector('video');

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


    $(document).keydown(function(e) {
        if (e.which === 16) {
            // shift was pressed
            if (secondsPerFrame) {
                downloadCurrentFrame(videoElem);
            } else {
                alert("Please press '.' or ',' at least once to establish your current frame number");
            }
        }
    });
}