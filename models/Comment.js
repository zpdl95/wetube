import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required",
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
  // /* 댓글에 해당 비디오 아이디를 저장하는 방법 */
  // video: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     /* ref에 적힌 이름은 생성된 모델 이름과 같아야 한다 */
  //     ref: "Video"
  // }
});

/* 데이터베이스의 실제 모델 생성 */
const model = mongoose.model("Comments", CommentSchema);
export default model;
