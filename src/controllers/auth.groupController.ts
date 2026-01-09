import { Response } from "express";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";
import { GroupService } from "../services/auth.groupService";

export class GroupController {
  static async createGroup(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });
      const group = await GroupService.createGroup(req.user.id, req.body);
      res.status(201).json(group);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getGroup(req: AuthenticatedRequest, res: Response) {
    const group = await GroupService.getGroupById(+req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json(group);
  }

  static async getMyGroups(req: AuthenticatedRequest, res: Response) {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const groups = await GroupService.getMyGroups(req.user.id);
    res.json(groups);
  }

  static async updateGroup(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });
      const group = await GroupService.updateGroup(
        +req.params.id,
        req.user.id,
        req.body
      );
      res.json(group);
    } catch (error: any) {
      res.status(403).json({ message: error.message });
    }
  }

  static async deleteGroup(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });
      await GroupService.deleteGroup(+req.params.id, req.user.id);
      res.json({ message: "Group deleted" });
    } catch (error: any) {
      res.status(403).json({ message: error.message });
    }
  }

  static async addMember(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });
      const member = await GroupService.addMember(
        +req.params.id,
        req.user.id,
        req.body.userId
      );
      res.status(201).json(member);
    } catch (error: any) {
      res.status(403).json({ message: error.message });
    }
  }

  static async removeMember(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });
      await GroupService.removeMember(
        +req.params.id,
        req.user.id,
        +req.params.userId
      );
      res.json({ message: "Member removed" });
    } catch (error: any) {
      res.status(403).json({ message: error.message });
    }
  }

  static async getMembers(req: AuthenticatedRequest, res: Response) {
    const members = await GroupService.getGroupMembers(+req.params.id);
    res.json(members);
  }
}
