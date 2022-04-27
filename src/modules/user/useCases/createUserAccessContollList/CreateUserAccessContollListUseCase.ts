import { inject, injectable } from "tsyringe";

import { UserNotFound } from "@modules/user/errors/UserNotFound";
import { IPermissionsRepository } from "@modules/user/repositories/IPermissionsRepository";
import { IRolesRepository } from "@modules/user/repositories/IRolesRepository";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

interface IRequest {
  userId: string;
  roles: string[];
}

@injectable()
class CreateUserAccessContollListUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
    @inject("RolesRepository")
    private readonly rolesRepository: IRolesRepository
  ) {}

  async execute({ userId, roles }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new UserNotFound("User not found!");

    const rolesExistents = await this.rolesRepository.findByIds(roles);

    user.roles = [...(user.roles ?? []), ...rolesExistents];

    await this.usersRepository.update(user);
  }
}

export { CreateUserAccessContollListUseCase };
