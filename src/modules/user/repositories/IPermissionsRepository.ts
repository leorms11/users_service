import { ICreatePermissionDTO } from "../dtos/ICreatePermissionDTO";
import { Permission } from "../infra/typeorm/entities/Permission";

export interface IPermissionsRepository {
  create(data: ICreatePermissionDTO): Promise<void>;
  findByName(name: string): Promise<Permission | null>;
}
