import { Request, Response } from "express";
import testsService from "../services/testsService.js";

export async function resetDatabase(req: Request, res: Response) {
  await testsService.resetDatabase();
  return res.sendStatus(200);
}

export async function seedDatabase(req: Request, res: Response) {
  await testsService.seedBadVideo();
  return res.sendStatus(201);
}
