import { Router } from "express";

import { CreateUserContoller } from "@modules/user/useCases/createUser/CreateUserContoller";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRouter = Router();

const createUserControlle = new CreateUserContoller();

userRouter.post("/", ensureAuthenticated, createUserControlle.handle);

export { userRouter };
