import { Router } from "express";

import authController from "../../controllers/auth-controller.js";

import * as userSchemas from "../../models/User.js";

import {validateBody} from "../../decorators/index.js";

import {authenticate} from "../../middleware/validation/index.js";

import upload from "../../middleware/upload.js";

const authRouter = Router();

const userSignupValidate = validateBody(userSchemas.userSignupSchema);
const userSigninValidate = validateBody(userSchemas.userSigninSchema);
const userEmailValidate = validateBody(userSchemas.userEmailSchema);

authRouter.post("/signup", userSignupValidate, authController.signup);

authRouter.get("/verify/:verificationToken", authController.verify);

authRouter.post("/verify", userEmailValidate, authController.resendVerifyEmail);

authRouter.post("/signin", userSigninValidate, authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

authRouter.patch("/avatars", upload.single("avatar"), authenticate, authController.updateAvatar);

export default authRouter;