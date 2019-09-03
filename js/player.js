const containerVideo = document.querySelector('.video__player'),
  video = document.querySelector('.video__burger'),
  player = document.querySelector('.video__controls'),
  play = document.querySelector('.video__start'),
  trackDot = document.querySelector('.video__track-dot'),
  track = document.querySelector('.video__line'),
  volume = document.querySelector('.video__volume'),
  volumeTrack = document.querySelector('.video__volume-line'),
  volumeDot = document.querySelector('.video__volume-dot'),
  playScreen = document.querySelector('.video__play-screen')


function defaultVolume() {
  const vol = video.volume = 0.2;
  volumeDot.style.left = Math.floor(vol * volumeTrack.clientWidth) + 'px';
}

function playPause() {
  (video.paused) ? video.play(): video.pause();
  containerVideo.classList.toggle('pause');
}

function timeUpdate() {
  const progress = Math.floor(video.currentTime) / Math.floor(video.duration);
  trackDot.style.left = `${Math.floor(progress * track.clientWidth)}px`;
}

function setCurrentTime(e) {
  const x = e.offsetX / track.clientWidth;
  video.currentTime = x * video.duration;
}

function muted(e) {
  e.currentTarget.classList.toggle('mute')
  video.muted = !video.muted;
}

function setVolume(e) {
  volumeDot.style.left = `${e.offsetX}px`;
  video.volume = e.offsetX / e.currentTarget.clientWidth;
  video.volume === 0 ? volume.classList.add('mute'):volume.classList.remove('mute')
}
video.addEventListener('canplaythrough', function () {
  defaultVolume();
});
play.addEventListener('click', function () {
  playPause()
});
playScreen.addEventListener('click', function () {
  playPause()
});
video.addEventListener('timeupdate', function () {
  timeUpdate();
});
track.addEventListener('click', function (e) {
  setCurrentTime(e);
});
volume.addEventListener('click', function (e) {
  muted(e);
});
volumeTrack.addEventListener('click', function (e) {
  setVolume(e);
});


