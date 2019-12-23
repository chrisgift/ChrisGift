var stop = "true";
var playButton = document.getElementById("playbutton1");
var volume = document.getElementById("volume1");
var vicon = document.getElementById('volume');
var player = document.getElementById('player1');
var progressbar = document.getElementById('audioprog');
var i = 1;
var progressper = player.duration * 15;
var currTimeDiv = document.getElementById('currentTime');
var durationDiv = document.getElementById('duration');
var range1 = document.getElementById('TrackTime1');
var dur = player.duration*100;

document.body.onkeyup = function(e){
  if(e.keyCode == 32){
    Play();
  }
  if(e.keyCode == 37){
    //left
  }
  if(e.keyCode == 38){
    //up
  }
  if(e.keyCode == 39){
    //right
  }
  if(e.keyCode == 40){
    //down
  }
}

function Play() {
  if (stop == "false") {
    player.pause();
    stop = "true";
    playButton.className = "fa fa-play fa-1x";
  } else {
    if (player.currentTime == player.duration) {
      player.currentTime = 0;
      currTimeDiv.innerHTML = "00:00";
      progressbar.value = 0;
    }
    if (i == 1) {
      i++;
      updateProgressBar();
    }
    player.play();
    stop = "false";
    playButton.className = "fa fa-pause fa-1x";
  }
}

function Volume() {
  var vol = volume.value;
  player.volume = vol;
  if(vol == 0) {
    vicon.className = "fa fa-volume-off";
  }
  if(vol > 0 && vol < 0.5) {
    vicon.className = "fa fa-volume-down";
  }
  if(vol > 0.5) {
    vicon.className = "fa fa-volume-up"
  }
}
function updateProgressBar() {
  var percentage = dur;
  var curr = progressbar.value;
  progressbar.max = dur;
  var update = setInterval(function() {
    if (curr > percentage) {
      clearInterval(update);
    } if (stop == "false") {
    progressbar.value = curr++;
  }}, 10)
}

function updateTrackTime(track) {
  var currTime = Math.floor(track.currentTime).toString();
  var duration = Math.floor(track.duration).toString();

  if (currTime == duration) {
    Play();
    i = 1;
  }

  currTimeDiv.innerHTML = formatSecondsAsTime(currTime) + " / ";

  if (isNaN(duration)) {
    durationDiv.innerHTML = '00:00';
  } else {
    durationDiv.innerHTML = formatSecondsAsTime(duration);
  }
}

function formatSecondsAsTime(secs, format) {
  var hr = Math.floor(secs / 3600);
  var min = Math.floor((secs - (hr * 3600)) / 60);
  var sec = Math.floor(secs - (hr * 3600) - (min * 60));

  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }

  return min + ':' + sec;
}
Volume();
