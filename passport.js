import passport from "passport";
import GithubStrategy from "passport-github";
import { githubLoginCallback } from "./controllers/userController";
import User from "./models/User";

/* 아래의 코드는 passport-local-mongoose의 shortcut이다 */
/* 대부분의 사람들이 user.id만 가지고 식별하기 때문에 이같은 shortcut을 사용한다 */

/* passport야 Strategy(로그인하는 방식)를 하나 사용해 */
/* .createStrategy()는 이미 구성된 passport-local의 LocalStrategy를 생성한다 */
passport.use(User.createStrategy());
/* 깃허브 로그인 방식 */
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: "http://localhost:5000/auth/github/callback",
    },
    githubLoginCallback()
  )
);
/* passport야 쿠키에는 오직 user.id만 담아서 보내도록 해 */
/* 사용자 인증 성공 시 호출(로그인시) */
/* 사용자 정보 object를 세션에 ID로 저장 */
passport.serializeUser(User.serializeUser());
/* 세션에 저장한 ID를 통해 사용자 정보 object를 불러옴 */
/* user.id를 가지고 사용자를 식별(데이터베이스에서 사용자 정보 조회) */
/* 조회한 정보를 req,user에 저장 */
passport.deserializeUser(User.deserializeUser());
