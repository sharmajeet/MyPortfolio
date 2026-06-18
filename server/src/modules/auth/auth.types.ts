export interface Admin {
  id: string;
  email: string;
  passwordHash: string;
}

/** Persistence boundary for admin accounts. */
export interface AdminRepository {
  findByEmail(email: string): Promise<Admin | null>;
  create(email: string, passwordHash: string): Promise<Admin>;
}
