import dotenv from "dotenv"; /* 환경변수값 가져오기 */
import app from "./app"; /* 서버 */
import "./db"; /* 데이터베이스 실행 */
import "./models/Video"; /* 데이터베이스 모델 가져오기 */
import "./models/Comment"; /* 데이터베이스 모델 가져오기 */
import "./models/User";

/* 현재 디렉토리의 .env 파일을 자동으로 인식해서 환경변수를 설정해줍니다 */
dotenv.config();
/* process.env[key] , process.env.NODE_ENV 환경변수 사용법 */
const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅ Listening on https://localhost:${PORT}`);

app.listen(PORT, handleListening); /* 서버 실행 */

/*
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, 'path/to/.env') })

원하는 위치의 .env파일을 지정할 수 있음
*/
