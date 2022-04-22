import { PermissionsRepositoryInMemory } from "@modules/user/repositories/in-memory/PermissionsRepositoryInMemory";
import { IPermissionsRepository } from "@modules/user/repositories/IPermissionsRepository";

import { CreatePermissionUseCase } from "../createPermission/CreatePermissionUseCase";

let createPermissionUseCase: CreatePermissionUseCase;
let permissionsRepository: IPermissionsRepository;

describe("Create Permission", () => {
  beforeAll(() => {
    permissionsRepository = PermissionsRepositoryInMemory.getInstance();
    permissionsRepository.create({
      name: "existent_permission",
      description: "Permissão ja cadastrada",
    });
  });

  beforeEach(() => {
    createPermissionUseCase = new CreatePermissionUseCase(
      permissionsRepository
    );
  });

  it("Should be able to create a new permission", async () => {
    await createPermissionUseCase.execute({
      name: "new_permission",
      description: "Nova Permissão",
    });

    const role = permissionsRepository.findByName("new_permission");
    expect(role).not.toBeNull();
  });

  it("Should not be able to create a new permission with an existent name", async () => {
    await expect(
      createPermissionUseCase.execute({
        name: "existent_permission",
        description: "Nova Permissão",
      })
    ).rejects.toThrowError();
  });
});
