const videoContainer = document.getElementById("jsVideoPlayer");
/* 띄워서 사용하면 #jsVideoPlayer안에 있는 video태그를 가져오는 것 */
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
  } else {
    videoPlayer.pause();
  }
}

function init() {
  playBtn.addEventListener("click", handlePlayClick);
}

/* videoContainer변수가 videoDetail에만 존재하기때문에 다른페이지에서는 에러가 나온다
그래서 조건으로 videoContainer가 있을때만 현재페이지가 실행되게 만들어줌 */
if (videoContainer) {
  init();
}
