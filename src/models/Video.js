import mongoose from "mongoose";
/* 데이터베이스의 형태 설정 */
const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required",
  },
  title: {
    type: String,
    required: "Title is required",
  },
  description: String,
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  /* 해당 비디오에 댓글 아이디를 저장하는 방법 */
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      /* ref에 적힌 이름은 생성된 모델 이름과 같아야 한다 */
      ref: "Comments",
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

/* 데이터베이스의 실제 모델 생성 */
/* model("", )에서 첫번째 인자가 이름임 */
const model = mongoose.model("Video", VideoSchema);
export default model;
