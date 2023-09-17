import { Router } from "express";

import authController from "../../controllers/auth-controller.js";

import * as userSchemas from "../../models/User.js";

import {validateBody} from "../../decorators/index.js";

import {authenticate} from "../../middleware/validation/index.js"

const authRouter = Router();

const userSignupValidate = validateBody(userSchemas.userSignupSchema);
const userSigninValidate = validateBody(userSchemas.userSigninSchema);

authRouter.post("/signup", userSignupValidate, authController.signup);

authRouter.post("/signin", userSigninValidate, authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

export default authRouter;