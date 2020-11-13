import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
});
/* 스키마에 passport 플러그인을 설치 */
/* usernameField: username이 될 field명을 명시해준다 */
/* username과 password를 이용한 인증 Strategy생성 */
UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });
/* model("", )에서 첫번째 인자가 이름임 */
const model = mongoose.model("User", UserSchema);
export default model;
