import { Repository } from "typeorm";

import { ICreateRoleDTO } from "@modules/user/dtos/ICreateRoleDTO";
import { IPermissionsRepository } from "@modules/user/repositories/IPermissionsRepository";
import { appDataSource } from "@shared/infra/typeorm/appDataSource";

import { Permission } from "../entities/Permission";

class PermissionsRepository implements IPermissionsRepository {
  private repository: Repository<Permission>;

  constructor() {
    this.repository = appDataSource.getRepository(Permission);
  }

  async create(data: ICreateRoleDTO): Promise<void> {
    const role = this.repository.create(data);
    await this.repository.save(role);
  }

  async findByName(name: string): Promise<Permission | null> {
    const role = await this.repository.findOne({
      where: { name },
    });

    return role;
  }
}

export { PermissionsRepository };
