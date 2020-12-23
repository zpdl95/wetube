import axios from "axios";
import delComment from "./deleteComment";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = async (comment, liId) => {
  const li = document.createElement("li");
  const divText = document.createElement("div");
  const span = document.createElement("span");
  const icon = document.createElement("i");
  icon.className = "fas fa-trash";
  icon.id = "jsDeleteComment";
  span.innerHTML = comment;
  divText.appendChild(span);
  li.appendChild(divText);
  li.appendChild(icon);
  li.id = liId;
  icon.addEventListener("click", delComment);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async (comment) => {
  /* api를 송신하는 현재 주소 */
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/addComment`,
    method: "POST",
    /* data는 비디오컨트롤러에 있는 req.body.comment 이어야 한다 */
    data: {
      /* 앞 comment는 req.body.comment고 뒤 comment는 text다 */
      comment: comment,
    },
  });
  if (response.status === 200) {
    const liId = response.data;
    addComment(comment, liId);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
