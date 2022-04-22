import "express-async-errors";
import express from "express";
import "@shared/infra/tsyringe/container";

import { globalErrorHandler } from "./middlewares/global-error-handler";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);
app.use(globalErrorHandler);

export { app };
