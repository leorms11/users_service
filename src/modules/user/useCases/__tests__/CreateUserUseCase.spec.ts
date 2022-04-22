import { UserRepositoyInMemory } from "@modules/user/repositories/in-memory/UserRepositoyInMemory";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";

let usersRepository: IUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
  beforeAll(async () => {
    usersRepository = UserRepositoyInMemory.getInstance();
    await usersRepository.create({
      firstName: "Existent",
      lastName: "User",
      email: "existent@user.com",
      password: "teste",
    });

    jest.mock("bcrypt");
  });

  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it("Should be able to create a new user", async () => {
    await createUserUseCase.execute({
      firstName: "Teste",
      lastName: "Unitário",
      email: "teste@teste.com",
      password: "1234",
    });

    const createdUser = usersRepository.findByEmail("teste@teste.com");
    expect(createdUser).not.toBeNull();
  });

  it("Should not be able to create a user with a already existent email", async () => {
    await expect(
      createUserUseCase.execute({
        firstName: "Teste",
        lastName: "Unitário",
        email: "existent@user.com",
        password: "1234",
      })
    ).rejects.toThrowError();
  });
});
