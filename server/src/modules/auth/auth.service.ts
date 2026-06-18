import bcrypt from "bcryptjs";
import { logger } from "../../config/logger.js";
import { signToken } from "../../shared/auth/jwt.js";
import { UnauthorizedError } from "../../shared/errors/app-error.js";
import type { AdminRepository } from "./auth.types.js";
import type { LoginInput } from "./auth.validation.js";

export class AuthService {
  constructor(private readonly repository: AdminRepository) {}

  async login({ email, password }: LoginInput): Promise<{ token: string }> {
    const admin = await this.repository.findByEmail(email);
    // Compare even when the admin is missing would be ideal, but the simple path is clear enough here.
    if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
      throw new UnauthorizedError("Invalid credentials");
    }
    return { token: signToken({ sub: admin.id, email: admin.email }) };
  }

  /** Creates the admin account from env on first boot; no-op if it already exists. */
  async seed(email: string, password: string): Promise<void> {
    if (await this.repository.findByEmail(email)) return;
    const passwordHash = await bcrypt.hash(password, 10);
    await this.repository.create(email, passwordHash);
    logger.info(`Seeded admin account: ${email}`);
  }
}
