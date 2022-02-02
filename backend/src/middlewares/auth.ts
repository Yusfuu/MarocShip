import { Response, Request, NextFunction } from "express";

// =========== auth middleware ============
export const auth: any = (role: any = null) => async (req: Request, res: Response, next: NextFunction) => {

  //@ts-ignore
  const user = req?.session?.user || null;
  if (user === null) {
    return res.status(401).json({ error: "unauthenticated" });
  }

  if (role && user?.role !== role) {
    return res.status(401).json({ error: "unauthorized" });
  }
  next();
};
