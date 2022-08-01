import { Router } from "express";
import { resetDatabase, seedDatabase } from "../controllers/testsController.js";

const testsRouter = Router();

testsRouter.post("/test/reset", resetDatabase);
testsRouter.post("/test/seed", seedDatabase);

export default testsRouter;
