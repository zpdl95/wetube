import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import {
  facebookLoginCallback,
  githubLoginCallback,
} from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";

// 아래의 코드는 passport-local-mongoose의 shortcut이다
// 대부분의 사람들이 user.id만 가지고 식별하기 때문에 이같은 shortcut을 사용한다

/* passport야 Strategy(로그인하는 방식)를 하나 사용해 */
/* .createStrategy()는 이미 구성된 passport-local의 LocalStrategy를 생성한다 */
passport.use(User.createStrategy());

/* 깃허브 로그인 방식 */
passport.use(
  new GithubStrategy(
    /* passport.authenticate("github")를 처음실행하면 ↓가 실행됨 */
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://tweetube1.herokuapp.com${routes.githubCallback}`
        : `http://localhost:5000${routes.githubCallback}`,
    },
    /* passport.authenticate("github")를 두번째로 실행하면 ↓가 실행됨 */
    githubLoginCallback
  )
);

/* 페이스북 로그인 방식 */
/* 페이스북은 'https'가 아니면 정보를 주지 않는다 */
passport.use(
  new FacebookStrategy(
    /* passport.authenticate("facebook")를 처음실행하면 ↓가 실행됨 */
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://tweetube1.herokuapp.com${routes.facebookCallback}`
        : `http://localhost:5000${routes.facebookCallback}`,
      /* 원하는 사용자 필드가 있을때 명시해줄것 */
      profileFields: ["id", "displayName", "photos", "email"],
      /* 추가권한이 필요한 경우 scope옵션 사용 */
      scope: ["public_profile", "email"],
    },
    /* passport.authenticate("facebook")를 두번째로 실행하면 ↓가 실행됨 */
    facebookLoginCallback
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
