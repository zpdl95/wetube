import mongoose from "mongoose";
/* 데이터베이스의 형태 설정 */
const VideoSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
        required: "File URL is required"
    },
    title: {
        type: String,
        required: "Titlte is required"
    },
    description: String,
    views: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }  
});
/* 데이터베이스의 실제 모델 생성 */
const model = mongoose.model("Video", VideoSchema);
export default model;