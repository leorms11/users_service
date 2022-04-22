import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserContoller {
  async handle(req: Request, res: Response): Promise<Response> {
    const { firstName, lastName, email, password } = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      firstName,
      lastName,
      email,
      password,
    });

    return res.status(201).send();
  }
}

export { CreateUserContoller };
