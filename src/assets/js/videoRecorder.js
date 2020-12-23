const recorderContainer = document.getElementById("jsRecorderContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = (event) => {
  /* 여기서 data는 blob데이터로 1회용 데이터다 */
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  /* download는 다운받을 파일이름을 정해줌 */
  link.download = "recorded.webm";
  document.body.appendChild(link);
  /* ↓ 함수실행시 자동클릭 */
  link.click();
};

// 녹화종료
const stopRecording = () => {
  videoPreview.stop();
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start recording";
};

// 녹화 시작
const startRecording = () => {
  /* ↓ stream을 가진 데이터를 MediaRecorder에 넣어 객체로 만든다 */
  /* MediaRecorder는 녹화가 끝나야 데이터를 넘겨준다(전체파일을 한번에 저장함) */
  videoRecorder = new MediaRecorder(streamObject);
  /* ↓ stream 녹화를 시작한다. state속성값이 recording으로 바뀐다 */
  videoRecorder.start();
  /* ↓ 의 이벤트는 녹화가 끝났을때 호출된다 */
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recordBtn.addEventListener("click", stopRecording);
};

// 카메라 데이터 받아오기
/* 정보를 주고 받아야 할때 async를 사용한다. 지금은 허가를 받기까지 기다려야함 */
const getVideo = async () => {
  /* 영상쵤영에 대한 허가를 받아야 하는데,
  성공하면 녹화를 시작하고 실패하면 녹화버튼이벤트 삭제 */
  try {
    /* ↓ 영상 녹화가 아니라 출력만 한다 */
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    /* srcObject는 소스로 줄 오브젝트를 말한다. 영상파일이 아니라 영상 오브젝트를 줘야하기 때문에 사용 */
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    /* 카메라가 주는 영상을 바로 출력 */
    videoPreview.play();
    recordBtn.innerHTML = "Stop recording";
    streamObject = stream;
    startRecording();
  } catch (error) {
    console.log(error);
    recordBtn.innerHTML = "😭 Can't record...";
    recordBtn.setAttribute("title", "You need to refresh");
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

function init() {
  recordBtn.addEventListener("click", getVideo);
  /* ↓ 처럼 코드를 사용하지 않는 이유는 1개의 이벤트만 할당할 수 있기 때문 
  recordBtn.onclick = getVideo;
  */
}

if (recorderContainer) {
  init();
}
