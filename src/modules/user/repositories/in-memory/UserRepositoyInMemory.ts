import { ICreateUserDTO } from "@modules/user/dtos/ICreateUserDTO";
import { User } from "@modules/user/infra/typeorm/entities/User";

import { IUsersRepository } from "../IUsersRepository";

class UserRepositoyInMemory implements IUsersRepository {
  private users: User[] = [];
  private static INSTANCE: UserRepositoyInMemory;

  constructor() {}

  static getInstance(): UserRepositoyInMemory {
    if (!UserRepositoyInMemory.INSTANCE) {
      UserRepositoyInMemory.INSTANCE = new UserRepositoyInMemory();
    }

    return UserRepositoyInMemory.INSTANCE;
  }

  async create({
    firstName,
    lastName,
    email,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User(firstName, lastName, email, password);

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async findById(id: string): Promise<User | null> {
    throw new Error();
  }
}

export { UserRepositoyInMemory };
