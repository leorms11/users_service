import { ICreateRoleDTO } from "@modules/user/dtos/ICreateRoleDTO";
import { Role } from "@modules/user/infra/typeorm/entities/Role";

import { IRolesRepository } from "../IRolesRepository";

class RolesRepositoryInMemory implements IRolesRepository {
  private roles: Role[] = [];
  private static INSTANCE: RolesRepositoryInMemory;

  constructor() {}

  static getInstance(): RolesRepositoryInMemory {
    if (!RolesRepositoryInMemory.INSTANCE) {
      RolesRepositoryInMemory.INSTANCE = new RolesRepositoryInMemory();
    }

    return RolesRepositoryInMemory.INSTANCE;
  }

  async create({ name, description }: ICreateRoleDTO): Promise<void> {
    const role = new Role(name, description);

    this.roles.push(role);
  }

  async findByName(name: string): Promise<Role | null> {
    const role = this.roles.find((role) => role.name === name);

    return role ?? null;
  }
}

export { RolesRepositoryInMemory };
