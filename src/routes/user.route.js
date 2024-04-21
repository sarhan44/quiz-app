import express from "express";
const userRouter = express.Router()

import { register, test } from "../controller/user.controller.js";
import { validateUrl } from "../middleware/validate.js";

userRouter.post('/register', register);
userRouter.post('/test',validateUrl,  test);

export default userRouter;