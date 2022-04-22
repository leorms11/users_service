import { AppError } from "@shared/errors/AppError";

class UserNotFound extends AppError {
  httpStatusCode = 400;
}

export { UserNotFound };
