import { Router } from "express";

import { CreateRoleController } from "@modules/user/useCases/createRole/CreateRoleController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const roleRouter = Router();
const createRoleController = new CreateRoleController();

roleRouter.use(ensureAuthenticated);
roleRouter.post("/", createRoleController.handle);

export { roleRouter };
