import { ICreateRoleDTO } from "@modules/user/dtos/ICreateRoleDTO";
import { Permission } from "@modules/user/infra/typeorm/entities/Permission";

import { IPermissionsRepository } from "../IPermissionsRepository";

class PermissionsRepositoryInMemory implements IPermissionsRepository {
  private roles: Permission[] = [];
  private static INSTANCE: PermissionsRepositoryInMemory;

  constructor() {}

  static getInstance(): PermissionsRepositoryInMemory {
    if (!PermissionsRepositoryInMemory.INSTANCE) {
      PermissionsRepositoryInMemory.INSTANCE =
        new PermissionsRepositoryInMemory();
    }

    return PermissionsRepositoryInMemory.INSTANCE;
  }

  async create({ name, description }: ICreateRoleDTO): Promise<void> {
    const role = new Permission(name, description);

    this.roles.push(role);
  }

  async findByName(name: string): Promise<Permission | null> {
    const role = this.roles.find((role) => role.name === name);

    return role ?? null;
  }
}

export { PermissionsRepositoryInMemory };
