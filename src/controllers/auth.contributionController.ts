import type { Request, Response } from "express";
import { ContributionService } from "../services/auth.contributionService";

export class ContributionController {
  static async create(req: Request, res: Response) {
    try {
      const contribution = await ContributionService.createContribution(
        req.body
      );
      res.status(201).json({ message: "Contribution created", contribution });
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  static async getOne(req: Request, res: Response) {
    try {
      const contribution = await ContributionService.getContributionById(
        Number(req.params.id)
      );
      res.json(contribution);
    } catch (err) {
      res.status(404).json({ error: (err as Error).message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const contributions = await ContributionService.getAllContributions();
      res.json(contributions);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const contribution = await ContributionService.updateContribution(
        Number(req.params.id),
        req.body
      );
      res.json({ message: "Contribution updated", contribution });
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const result = await ContributionService.deleteContribution(
        Number(req.params.id)
      );
      res.json(result);
    } catch (err) {
      res.status(404).json({ error: (err as Error).message });
    }
  }
}
