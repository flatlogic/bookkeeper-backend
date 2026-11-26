import { Request, Response } from "express";

export function readSort(req: Request, res: Response): {key: string; direction: "ASC" | "DESC"} | null {
  const {sortKey = "id", sortOrder = "asc"} = req.query;
  const direction = typeof sortOrder === "string" ? sortOrder.toUpperCase() : "";
  if (typeof sortKey !== "string" || !/^[A-Za-z_][\w]*(\.[A-Za-z_][\w]*)*$/.test(sortKey)
      || (direction !== "ASC" && direction !== "DESC")) {
    res.status(400).json({errors: {message: "Provide a sort field and an ASC or DESC sort order"}});
    return null;
  }
  return {key: sortKey, direction};
}
