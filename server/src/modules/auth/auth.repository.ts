import { AdminModel } from "./auth.model.js";
import type { Admin, AdminRepository } from "./auth.types.js";

export class MongoAdminRepository implements AdminRepository {
  async findByEmail(email: string): Promise<Admin | null> {
    const document = await AdminModel.findOne({ email });
    return document ? { id: document.id, email: document.email, passwordHash: document.passwordHash } : null;
  }

  async create(email: string, passwordHash: string): Promise<Admin> {
    const document = await AdminModel.create({ email, passwordHash });
    return { id: document.id, email: document.email, passwordHash: document.passwordHash };
  }
}
