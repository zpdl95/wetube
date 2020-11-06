import routes from "./routes";
import multer from "multer";

export const localsMiddlewares = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};

/* dest는 destination으로 목적지를 적어야함. 여기선 videos폴더 */
const multerVideo = multer({ dest: "uploads/videos/" });
/* single은 1개의 파일만 받는다는 뜻 */
export const uploadVideo = multerVideo.single("videoFile");
