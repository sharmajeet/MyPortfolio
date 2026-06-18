import type { Request, Response } from "express";
import type { AuthService } from "./auth.service.js";
import type { LoginInput } from "./auth.validation.js";

export class AuthController {
  constructor(private readonly service: AuthService) {}

  login = async (req: Request, res: Response): Promise<void> => {
    const result = await this.service.login(req.body as LoginInput);
    res.json(result);
  };
}
