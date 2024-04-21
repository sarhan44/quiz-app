import express from "express";
const authRouter = express.Router()

import { login } from "../controller/auth.controller.js";

authRouter.post('/login', login);

export default authRouter;