import { Router } from "express";
import { ContributionController } from "../controllers/auth.contributionController";

const router = Router();

// CRUD routes
router.post("/", ContributionController.create); // create
router.get("/", ContributionController.getAll); // get all
router.get("/:id", ContributionController.getOne); // get one
router.put("/:id", ContributionController.update); // update
router.delete("/:id", ContributionController.delete); // delete

export default router;
