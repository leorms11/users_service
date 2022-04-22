import { inject, injectable } from "tsyringe";

import { IRolesRepository } from "@modules/user/repositories/IRolesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateRoleUseCase {
  constructor(
    @inject("RolesRepository")
    private readonly rolesRepository: IRolesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const roleAlreadyExists = await this.rolesRepository.findByName(name);

    if (roleAlreadyExists) throw new AppError("Role already exists!");

    await this.rolesRepository.create({
      name,
      description,
    });
  }
}

export { CreateRoleUseCase };
