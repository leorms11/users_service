export class AppError extends Error {
  httpStatusCode?: number;

  constructor(message: string) {
    super(message);
    this.name = "AppError";
  }
}
