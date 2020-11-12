import multer from "multer";
import routes from "./routes";

export const localsMiddlewares = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: false,
    id: 1,
  };
  next();
};

/* dest는 destination으로 목적지를 적어야함. 여기선 videos폴더 */
/* 업로드된 비디오파일의 저장소 */
const multerVideo = multer({ dest: "uploads/videos/" });
/* single은 1개의 파일만 업로드가능 */
/* ()안에 들어갈 내용은 upload.pug에서 input에 들어갈 name값을 적어야함 */
export const uploadVideo = multerVideo.single("videoFile");
