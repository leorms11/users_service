import { container } from "tsyringe";

import { PermissionsRepository } from "@modules/user/infra/typeorm/repositories/PermissionsRepository";
import { RolesRepository } from "@modules/user/infra/typeorm/repositories/RolesRepository";
import { UsersRepository } from "@modules/user/infra/typeorm/repositories/UsersRepository";
import { IPermissionsRepository } from "@modules/user/repositories/IPermissionsRepository";
import { IRolesRepository } from "@modules/user/repositories/IRolesRepository";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

// Repositories
container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
container.registerSingleton<IRolesRepository>(
  "RolesRepository",
  RolesRepository
);
container.registerSingleton<IPermissionsRepository>(
  "PermissionsRepository",
  PermissionsRepository
);
