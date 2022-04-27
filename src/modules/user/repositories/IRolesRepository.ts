import { ICreateRoleDTO } from "../dtos/ICreateRoleDTO";
import { Role } from "../infra/typeorm/entities/Role";

export interface IRolesRepository {
  create(data: ICreateRoleDTO): Promise<void>;
  findByName(name: string): Promise<Role | null>;
  findByIds(ids: string[]): Promise<Role[]>;
}
