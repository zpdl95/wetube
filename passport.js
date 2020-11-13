import passport from "passport";
import User from "./models/User";

/* passport야 Strategy(로그인하는 방식)를 하나 사용해 */
/* .createStrategy()는 이미 구성된 passport-local의 LocalStrategy를 생성한다 */
passport.use(User.createStrategy());
