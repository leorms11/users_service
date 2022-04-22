import { RolesRepositoryInMemory } from "@modules/user/repositories/in-memory/RolesRepositoryInMemory";
import { IRolesRepository } from "@modules/user/repositories/IRolesRepository";

import { CreateRoleUseCase } from "../createRole/CreateRoleUseCase";

let createRoleUseCase: CreateRoleUseCase;
let rolesRepository: IRolesRepository;

describe("Create Role", () => {
  beforeAll(() => {
    rolesRepository = RolesRepositoryInMemory.getInstance();
    rolesRepository.create({
      name: "existent_role",
      description: "Role já criada",
    });
  });

  beforeEach(() => {
    createRoleUseCase = new CreateRoleUseCase(rolesRepository);
  });

  it("Should be able to create a new role", async () => {
    await createRoleUseCase.execute({
      name: "new_role",
      description: "New Role",
    });

    const role = rolesRepository.findByName("new_role");
    expect(role).not.toBeNull();
  });

  it("Should not be able to create a new role with an existent name", async () => {
    await expect(
      createRoleUseCase.execute({
        name: "existent_role",
        description: "New Role",
      })
    ).rejects.toThrowError();
  });
});
