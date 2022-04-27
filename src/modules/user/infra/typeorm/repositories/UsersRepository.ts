import { Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/user/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";
import { appDataSource } from "@shared/infra/typeorm/appDataSource";

import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = appDataSource.getRepository(User);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOneBy({
      id,
    });

    return user;
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const user = this.repository.create(data);

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async update(user: User): Promise<void> {
    await this.repository.save(user);
  }
}

export { UsersRepository };
