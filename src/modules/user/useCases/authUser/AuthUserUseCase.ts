import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { UserNotFound } from "@modules/user/errors/UserNotFound";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthUserUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new UserNotFound("Email or password incorrect!");

    const passowrdMatch = await compare(password, user.password);
    console.log("AAA", passowrdMatch);
    if (!passowrdMatch) throw new UserNotFound("Email or password incorrect!");

    const token = sign({}, process.env.TOKEN_SECRET as string, {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    };
  }
}

export { AuthUserUseCase };
