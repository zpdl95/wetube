import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  /*기본 설정값*/ useNewUrlParser: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) =>
  console.log(`🚫 Error on DB Connection: ${error}`);

/* 한번 열고 함수 실행 */
db.once("open", handleOpen);
/* 에러상태가 됐을때 함수 실행 */
db.on("error", handleError);
