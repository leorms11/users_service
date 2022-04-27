import { ICreateUserDTO } from "@modules/user/dtos/ICreateUserDTO";
import { User } from "@modules/user/infra/typeorm/entities/User";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoyInMemory implements IUsersRepository {
  private users: User[] = [];
  private static INSTANCE: UsersRepositoyInMemory;

  constructor() {}

  static getInstance(): UsersRepositoyInMemory {
    if (!UsersRepositoyInMemory.INSTANCE) {
      UsersRepositoyInMemory.INSTANCE = new UsersRepositoyInMemory();
    }

    return UsersRepositoyInMemory.INSTANCE;
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
    return this.users.find((user) => user.id === id) ?? null;
  }

  async update(user: User): Promise<void> {
    this.users = this.users.map((u) => {
      if (u.id === user.id) {
        Object.assign(u, user);
      }

      return u;
    });
  }
}

export { UsersRepositoyInMemory };
