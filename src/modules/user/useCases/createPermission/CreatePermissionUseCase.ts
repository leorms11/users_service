import { inject, injectable } from "tsyringe";

import { IPermissionsRepository } from "@modules/user/repositories/IPermissionsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreatePermissionUseCase {
  constructor(
    @inject("PermissionsRepository")
    private readonly permissionsRepository: IPermissionsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const permissionAlreadyExists = await this.permissionsRepository.findByName(
      name
    );

    if (permissionAlreadyExists) throw new AppError("Role already exists!");

    await this.permissionsRepository.create({
      name,
      description,
    });
  }
}

export { CreatePermissionUseCase };
