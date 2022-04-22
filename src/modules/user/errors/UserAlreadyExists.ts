import { AppError } from "@shared/errors/AppError";

class UserAlreadyExists extends AppError {
  httpStatusCode = 400;
}

export { UserAlreadyExists };
