import "reflect-metadata";

import dotenv from "dotenv";

import { appDataSource } from "../typeorm/appDataSource";
import { app } from "./app";

dotenv.config();

appDataSource
  .initialize()
  .then(() => {
    const server = app.listen(process.env.SERVER_PORT, () => {
      return console.log(
        `🚀 Service started at port - ${process.env.SERVER_PORT}`
      );
    });

    process.on("SIGTERM", () => {
      server.close();
    });
  })
  .catch((err: any) => {
    console.log(err);
    process.exit(0);
  });
