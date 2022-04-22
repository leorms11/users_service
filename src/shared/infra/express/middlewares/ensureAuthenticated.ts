import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UserNotFound } from "@modules/user/errors/UserNotFound";
import { UsersRepository } from "@modules/user/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError("Token missing");

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(userId);

    if (!user) throw new UserNotFound("User not exists");

    req.userId = userId;
    next();
  } catch (error: any) {
    throw new AppError("Invalid token!");
  }
}
