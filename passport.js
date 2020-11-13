import passport from "passport";
import User from "./models/User";

/* 아래의 코드는 passport-local-mongoose의 shortcut이다 */
/* 대부분의 사람들이 user.id만 가지고 식별하기 때문에 이같은 shortcut을 사용한다 */

/* passport야 Strategy(로그인하는 방식)를 하나 사용해 */
/* .createStrategy()는 이미 구성된 passport-local의 LocalStrategy를 생성한다 */
passport.use(User.createStrategy());
/* passport야 쿠키에는 오직 user.id만 담아서 보내도록 해 */
passport.serializeUser(User.serializeUser());
/* user.id를 가지고 사용자를 식별 */
passport.deserializeUser(User.deserializeUser());
