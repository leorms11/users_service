import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserAccessContollListUseCase } from "./CreateUserAccessContollListUseCase";

class CreateUserAccessContollListController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { userId, roles } = req.body;

    const createUserAccessContollListUseCase = container.resolve(
      CreateUserAccessContollListUseCase
    );

    await createUserAccessContollListUseCase.execute({ userId, roles });

    return res.status(201).send();
  }
}

export { CreateUserAccessContollListController };
