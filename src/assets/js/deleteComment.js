import axios from "axios";

const delCommentBtn = document.querySelectorAll("#jsDeleteComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const sendDelete = async (commentId) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/delComment`,
    method: "POST",
    /* data는 비디오컨트롤러에 있는 req.body.comment 이어야 한다 */
    data: {
      /* 앞 comment는 req.body.comment고 뒤 comment는 text다 */
      commentId,
    },
  });
  if (response.status === 200) {
    decreaseNumber();
  }
};

const delComment = (event) => {
  const btn = event.target;
  const li = btn.parentNode;
  commentList.removeChild(li);
  try {
    const commentId = li.id;
    sendDelete(commentId);
  } catch (error) {
    console.log(error);
  }
};

function init() {
  delCommentBtn.forEach((btn) => btn.addEventListener("click", delComment));
}

if (delCommentBtn.length !== 0) {
  init();
}

export default delComment;
