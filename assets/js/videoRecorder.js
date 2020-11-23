const recorderContainer = document.getElementById("jsRecorderContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

/* 정보를 주고 받아야 할때 async를 사용한다. 지금은 허가를 받기까지 기다려야함 */
const startRecording = async () => {
  /* 영상쵤영에 대한 허가를 받아야 하는데,
  성공하면 녹화를 시작하고 실패하면 녹화버튼이벤트 삭제 */
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    /* srcObject는 소스로 줄 오브젝트를 말한다. 영상파일이 아니라 영상 오브젝트를 줘야하기 때문에 사용 */
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    /* 카메라가 주는 영상을 바로 출력 */
    videoPreview.play();
  } catch (error) {
    console.log(error);
    recordBtn.innerHTML = "😭 Can't record...";
    recordBtn.setAttribute("title", "You need to refresh");
    recordBtn.removeEventListener("click", startRecording);
  }
};

function init() {
  recordBtn.addEventListener("click", startRecording);
}

if (recorderContainer) {
  init();
}
