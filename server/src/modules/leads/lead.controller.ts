import path from "node:path";
import type { Request, Response } from "express";
import { env } from "../../config/env.js";
import { toCsv } from "../../shared/http/csv.js";
import { getClientContext } from "../../shared/request/client-context.js";
import type { LeadService } from "./lead.service.js";
import type { CaptureLeadInput } from "./lead.validation.js";

const RESUME_FILE = path.resolve(env.RESUME_PATH);
const RESUME_DOWNLOAD_NAME = "Jeet_Sharma_Resume.pdf";
const EXPORT_COLUMNS = [
  "id", "name", "email", "company", "note", "purpose", "country", "city", "browser", "os", "createdAt",
];

export class LeadController {
  constructor(private readonly service: LeadService) {}

  // Public: capture details first, then stream the resume. The form cannot be bypassed.
  requestResume = async (req: Request, res: Response): Promise<void> => {
    await this.service.captureForResume(req.body as CaptureLeadInput, getClientContext(req));
    await sendDownload(res, RESUME_FILE, RESUME_DOWNLOAD_NAME);
  };

  list = async (_req: Request, res: Response): Promise<void> => {
    res.json(await this.service.list());
  };

  exportCsv = async (_req: Request, res: Response): Promise<void> => {
    const leads = await this.service.list();
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="leads.csv"');
    res.send(toCsv(leads as unknown as Record<string, unknown>[], EXPORT_COLUMNS));
  };
}

function sendDownload(res: Response, file: string, name: string): Promise<void> {
  return new Promise((resolve, reject) => {
    res.download(file, name, (err) => (err ? reject(err) : resolve()));
  });
}
