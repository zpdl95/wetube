import express from 'express';
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.users, (req, res) => res.send("users"));
userRouter.get(routes.user_detail, (req, res) => res.send("user_detail"));
userRouter.get(routes.edit_profile, (req, res) => res.send("edit_profile"));
userRouter.get(routes.change_password, (req, res) => res.send("change_password"));

export default userRouter;