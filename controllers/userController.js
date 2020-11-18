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
  // email이 이미 존재하면 다른 email로 사용하라고 해야됨
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

/* routes에서 깃허브페이지로 로그인 인증을 하라고 보냄 */
/* passport.js에 new GithubStrategy로 넘어감 */
export const githubLogin = passport.authenticate("github");

/* 깃허브페이지에서 로그인 인증을 받고 난뒤 실행되는 함수 */
/* 'cb'이 콜백 함수는 passport에서 제공된 callback함수다 */
/* accessToken→_, refreshToken→__ */
export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url, name, email },
  } = profile;

  try {
    /* 깃허브에서 제공한 email을 가지고 데이터베이스에서 유저를 찾는다 */
    const user = await User.findOne({ email });

    /* 유저가 있으면, 유저의 githubId를 깃허브에서 준 id로 한다 */
    if (user) {
      user.githubId = id;
      user.save(); /* 데이터베이스 저장 & 업데이트 */

      /* cb(err, user) 첫 변수는 에러, 두번째 변수는 유저 */
      /* 인증이 성공했을때 호출 */
      /* 에러가 없고, 유저가 있으면 passport는 사용자를 찾았다고 알게됨
      그러면 passport는 user ID를 쿠키에 넣어준다 */
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl: avatar_url,
    });
    return cb(null, newUser);
  } catch (error) {
    /* 유저 없이 에러만 있으면, passport는 사용자를 못 찾은걸로 알게됨 */
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

/* routes에서 페이스북페이지로 로그인 인증을 하라고 보냄 */
/* passport.js에 new FacebookStrategy로 넘어감 */
export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, name, email },
  } = profile;
  try {
    /* 페이스북에서 제공한 email을 가지고 데이터베이스에서 유저를 찾는다 */
    const user = await User.findOne({ email });

    /* 유저가 있으면, 유저의 facebookId를 페이스북에서 준 id로 한다 */
    if (user) {
      user.facebookId = id;
      user.save(); /* 데이터베이스 저장 & 업데이트 */

      /* cb(err, user) 첫 변수는 에러, 두번째 변수는 유저 */
      /* 인증이 성공했을때 호출 */
      /* 에러가 없고, 유저가 있으면 passport는 사용자를 찾았다고 알게됨
      그러면 passport는 user ID를 쿠키에 넣어준다 */
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  /* passport는 편리한 로그아웃기능을 제공.
  req.logout()을 사용하면 req.user을 제거하고, 로그인세션을 끝낸다 */
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  /* req.user는 현재 로그인된 유저 */
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    console.log(req.user);
    console.log(req.user.id);
    /* findByIdAndUpdate(_,__)의 첫번째 인자는 id, 두번째 인자는 변경할 값 */
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    res.redirect(routes.me);
  } catch (error) {
    res.render("editProfile", { pageTitle: "Edit Profile" });
  }
};

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
