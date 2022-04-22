import { Router } from "express";

import { roleRouter } from "./roles.routes";
import { userRouter } from "./user.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/routes", roleRouter);

export { router };
