const videoContainer = document.getElementById("jsVideoPlayer");
/* 띄워서 사용하면 #jsVideoPlayer안에 있는 video태그를 가져오는 것 */
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");
const fullScreenBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

function handlePlayBtn() {
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handlePlayClick() {
  /* 플레이어가 정지상태면 실행을 시켜주고 아니면 정지시켜준다 */
  /* videoPlayer.paused 정지상태인지 boolean타입으로 알려줌 */
  if (videoPlayer.paused) {
    videoPlayer.play();
    /* innerHTML을 사용해서 내용물을 바꾼다 */
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}
function exitFullScreen() {
  if (document.exitFullscreen()) {
    document.exitFullscreen();
  } else if (document.mozCancelFullscreen()) {
    document.mozCancelFullscreen();
  } else if (document.webkitExitFullscreen()) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen()) {
    document.msExitFullscreen();
  }
  fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScreenBtn.removeEventListener("click", exitFullScreen);
  fullScreenBtn.addEventListener("click", goFullScreen);
}

function goFullScreen() {
  /* 만약 ↓ 코드가 안된다면, videoPlayer.webkitRequestFullscreen(); 사용. 엔진명을 명시해줘야함 */
  if (videoContainer.requestFullscreen()) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullscreen()) {
    videoContainer.mozRequestFullscreen();
  } else if (videoContainer.webkitRequestFullscreen()) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen()) {
    videoContainer.msRequestFullscreen();
  }
  fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenBtn.removeEventListener("click", goFullScreen);
  fullScreenBtn.addEventListener("click", exitFullScreen);
}

const formatDate = (seconds) => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  currentTime.innerText = formatDate(videoPlayer.currentTime);
}

/* ↓의 함수는 될때도 있고 안될때도 있는데 비디오가 로드되기전에 함수가 실행되면 NaN으로 나온다 */
function setTotalTime() {
  totalTime.innerText = formatDate(videoPlayer.duration);
  setInterval(getCurrentTime, 1000);
}

function init() {
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScreenBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("ended", handlePlayBtn);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
}

/* videoContainer변수가 videoDetail에만 존재하기때문에 다른페이지에서는 에러가 나온다
그래서 조건으로 videoContainer가 있을때만 현재페이지가 실행되게 만들어줌 */
if (videoContainer) {
  init();
}
