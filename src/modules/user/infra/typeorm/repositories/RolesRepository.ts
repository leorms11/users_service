import { Repository } from "typeorm";

import { ICreateRoleDTO } from "@modules/user/dtos/ICreateRoleDTO";
import { IRolesRepository } from "@modules/user/repositories/IRolesRepository";
import { appDataSource } from "@shared/infra/typeorm/appDataSource";

import { Role } from "../entities/Role";

class RolesRepository implements IRolesRepository {
  private repository: Repository<Role>;

  constructor() {
    this.repository = appDataSource.getRepository(Role);
  }

  async create(data: ICreateRoleDTO): Promise<void> {
    const role = this.repository.create(data);
    await this.repository.save(role);
  }

  async findByName(name: string): Promise<Role | null> {
    const role = await this.repository.findOne({
      where: { name },
    });

    return role;
  }
}

export { RolesRepository };
