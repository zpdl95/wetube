import getBlobDuration from "get-blob-duration";

const videoContainer = document.getElementById("jsVideoPlayer");
/* 띄워서 사용하면 #jsVideoPlayer안에 있는 video태그를 가져오는 것 */
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");
const fullScreenBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("jsCurrentTime");
const totalTime = document.getElementById("jsTotalTime");
const volumeRange = document.getElementById("jsVolume");

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  /* 데이터베이스를 변경해야하기 때문에 POST를 사용한다 */
  fetch(`/api/${videoId}/view`, { method: "POST" });
};

function handleEnded() {
  registerView();
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  videoPlayer.currentTime = 0;
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
    volumeRange.value = videoPlayer.volume;
    if (volumeRange.value > 0.0 && volumeRange.value <= 0.3) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
    } else if (volumeRange.value > 0.3 && volumeRange.value <= 0.6) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else if (volumeRange.value > 0.6) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
  } else {
    videoPlayer.muted = true;
    volumeRange.value = 0;
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
  /* 실수로 표현하게 된 이유는 영상이 완료됬을때 현재시간이 전체시간과 같게 나오기 위함 */
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

/* ↓의 함수는 될때도 있고 안될때도 있는데 비디오가 로드되기전에 함수가 실행되면 NaN으로 나온다 */
async function setTotalTime() {
  /* ↓ 하는 이유는 녹화영상이 blob데이터라서 그냥 업로드하면 영상길이가 NaN로 나오기때문 */
  const blob = await fetch(videoPlayer.src).then((response) => response.blob());
  const duration = await getBlobDuration(blob);
  totalTime.innerHTML = formatDate(duration);
  // setInterval(getCurrentTime, 1000);
}

function handleDrag(event) {
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;
  if (parseFloat(value) === 0) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else if (value > 0.0 && value <= 0.3) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  } else if (value > 0.3 && value <= 0.6) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else if (value > 0.6) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  }
}

function init() {
  /* 비디오의 볼륨 기본값을 설정 */
  videoPlayer.volume = 0.5;
  // 실행버튼
  videoPlayer.addEventListener("click", handlePlayClick);
  playBtn.addEventListener("click", handlePlayClick);
  // 소리켜고끄기
  volumeBtn.addEventListener("click", handleVolumeClick);
  // 확대 축소
  fullScreenBtn.addEventListener("click", goFullScreen);
  // 전체시간 표시
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("play", setTotalTime);
  // 현재시간 표시
  videoPlayer.addEventListener("timeupdate", getCurrentTime);
  // 재생완료후 초기화
  videoPlayer.addEventListener("ended", handleEnded);
  // 볼륨조절
  volumeRange.addEventListener("input", handleDrag);
}

/* videoContainer변수가 videoDetail에만 존재하기때문에 다른페이지에서는 에러가 나온다
그래서 조건으로 videoContainer가 있을때만 현재페이지가 실행되게 만들어줌 */
if (videoContainer) {
  init();
}
