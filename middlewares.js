import multer from "multer";
import routes from "./routes";

/* 모든 요청에 대해 이 함수를 실행기키기 때문에 전역변수로 사용한다 */
export const localsMiddlewares = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  /* req.user는 쿠키정보 */
  /* 세션에 저장됨 */
  res.locals.user = req.user || null;
  next();
};
/* 비로그인사용자만 */
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};
/* 로그인 사용자만 */
export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

/* dest는 destination으로 목적지를 적어야함. 여기선 videos폴더 */
/* 업로드된 비디오파일의 저장소 */
const multerVideo = multer({ dest: "uploads/videos/" });
/* single은 1개의 파일만 업로드가능 */
/* ()안에 들어갈 내용은 upload.pug에서 input에 들어갈 name값을 적어야함 */
export const uploadVideo = multerVideo.single("videoFile");
