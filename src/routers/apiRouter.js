import express from "express";
import routes from "../routes";
import {
  postAddComment,
  postDelComment,
  postRegisterView,
} from "../controllers/videoController";

const apiRouter = express.Router();
/* 데이터베이스를 변경해야하기 때문에 POST를 사용한다 */
apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.delComment, postDelComment);

export default apiRouter;
