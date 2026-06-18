import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes.js";
import { commentRouter } from "../modules/comments/comment.routes.js";
import { contactRouter } from "../modules/contact/contact.routes.js";
import { eventRouter } from "../modules/events/event.routes.js";
import { leadRouter } from "../modules/leads/lead.routes.js";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

apiRouter.use("/auth", authRouter);
apiRouter.use("/events", eventRouter);
apiRouter.use("/leads", leadRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/contact", contactRouter);
