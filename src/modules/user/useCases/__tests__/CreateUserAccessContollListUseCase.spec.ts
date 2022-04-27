import { RolesRepositoryInMemory } from "@modules/user/repositories/in-memory/RolesRepositoryInMemory";
import { UsersRepositoyInMemory } from "@modules/user/repositories/in-memory/UsersRepositoyInMemory";
import { IRolesRepository } from "@modules/user/repositories/IRolesRepository";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

import { CreateUserAccessContollListUseCase } from "../createUserAccessContollList/CreateUserAccessContollListUseCase";

let usersRepository: IUsersRepository;
let rolesRepository: IRolesRepository;
let createUserAccessContollListUseCase: CreateUserAccessContollListUseCase;

describe("Create User Access Controll", () => {
  beforeAll(() => {
    usersRepository = new UsersRepositoyInMemory();
    rolesRepository = new RolesRepositoryInMemory();
    usersRepository.create({
      firstName: "Existent",
      lastName: "User",
      email: "teste@teste.com",
      password: "1234",
    });

    rolesRepository.create({
      name: "teste",
      description: "Role teste",
    });
  });

  beforeEach(() => {
    createUserAccessContollListUseCase = new CreateUserAccessContollListUseCase(
      usersRepository,
      rolesRepository
    );
  });

  it("Should be able to sign roles to user", async () => {
    let user = await usersRepository.findByEmail("teste@teste.com");
    const role = await rolesRepository.findByName("teste");

    await createUserAccessContollListUseCase.execute({
      userId: user?.id as string,
      roles: [role?.id] as string[],
    });

    user = await usersRepository.findByEmail("teste@teste.com");
    expect(user?.roles).toHaveLength(1);
  });
});
