import { Router } from "express";

import { AuthUserController } from "@modules/user/useCases/authUser/AuthUserController";

const authRouter = Router();
const authUserController = new AuthUserController();

authRouter.post("/session", authUserController.handle);

export { authRouter };
