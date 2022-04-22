import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { UserAlreadyExists } from "@modules/user/errors/UserAlreadyExists";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

interface IRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({
    firstName,
    lastName,
    email,
    password,
  }: IRequest): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) throw new UserAlreadyExists("User already exists");

    const hasedPassword = await hash(password, 8);

    await this.usersRepository.create({
      firstName,
      lastName,
      email,
      password: hasedPassword,
    });
  }
}

export { CreateUserUseCase };
