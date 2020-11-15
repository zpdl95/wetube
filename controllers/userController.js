import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password1 },
  } = req;
  if (password !== password1) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      /* 유저를 등록하면서 데이터베이스에 저장 */
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Log in" });
};
/* 유저인증호출 */
/* 'local'은 User.js에 있는 Strategy다 */
/* 데이터베이스에 있는 것과 비교해서 인증함 */
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLogin = passport.authenticate("github");

/* 깃허브페이지에서 로그인 인증을 받고 난뒤 실행하는 함수 */
export const githubLoginCallback = (accessToken, refreshToken, profile, cb) => {
  console.log(accessToken, refreshToken, profile, cb);
};

export const logout = (req, res) => {
  /* passport는 편리한 로그아웃기능을 제공.
  req.logout()을 사용하면 req.user을 제거하고, 로그인세션을 끝낸다 */
  req.logout();
  res.redirect(routes.home);
};

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });

export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
