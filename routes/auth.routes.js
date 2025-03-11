import { Router } from "express";

import { signIn, signOut, signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

// path /api/v1/auth/sign-up (POST)

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-out', signOut);

export default authRouter;