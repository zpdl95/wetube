const videoContainer = document.getElementById("jsVideoPlayer");
/* 띄워서 사용하면 #jsVideoPlayer안에 있는 video태그를 가져오는 것 */
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");

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

function init() {
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  videoPlayer.addEventListener("ended", handlePlayBtn);
}

/* videoContainer변수가 videoDetail에만 존재하기때문에 다른페이지에서는 에러가 나온다
그래서 조건으로 videoContainer가 있을때만 현재페이지가 실행되게 만들어줌 */
if (videoContainer) {
  init();
}
