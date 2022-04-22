import { UserRepositoyInMemory } from "@modules/user/repositories/in-memory/UserRepositoyInMemory";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

import { AuthUserUseCase } from "../authUser/AuthUserUseCase";

let authUserUseCase: AuthUserUseCase;
let usersRepository: IUsersRepository;

describe("Authenticate User", () => {
  beforeAll(async () => {
    usersRepository = UserRepositoyInMemory.getInstance();
    usersRepository.create({
      firstName: "User",
      lastName: "Test",
      email: "teste@teste.com",
      password: "teste",
    });
  });

  beforeEach(() => {
    authUserUseCase = new AuthUserUseCase(usersRepository);
  });

  it("Should be able to authenticate an user", async () => {
    const { token } = await authUserUseCase.execute({
      email: "teste@teste.com",
      password: "teste",
    });
    expect(token).toBe("token");
  });

  it("Should not be able to authenticate an user with a wrong passwod", async () => {
    await expect(
      authUserUseCase.execute({
        email: "teste@teste.com",
        password: "wrong_password",
      })
    ).rejects.toThrowError();
  });

  it("Should not be able to authenticate an user with a wrong email", async () => {
    await expect(
      authUserUseCase.execute({
        email: "wrong_email",
        password: "teste",
      })
    ).rejects.toThrowError();
  });
});
