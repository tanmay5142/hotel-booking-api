import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";

export function validateBody(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: err.issues.map((e) => ({ field: e.path.join("."), message: e.message })),
        });
      }
      next(err);
    }  
  };
}

export function validateQuery(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query) as any;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: err.issues.map((e) => ({ field: e.path.join("."), message: e.message })),
        });
      }
      next(err);
    }
  };
}    