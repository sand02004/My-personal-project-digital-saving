// controllers/groupMember.controller.ts
import { Request, Response } from "express";
import { GroupMemberService } from "../services/auth.groupmemberService";

export class GroupMemberController {
  static async create(req: Request, res: Response) {
    try {
      const { groupId, userId, role } = req.body;

      // Basic validation
      if (!groupId || !userId) {
        return res
          .status(400)
          .json({ message: "groupId and userId are required." });
      }

      const groupMember = await GroupMemberService.createGroupMember({
        groupId,
        userId,
        role,
      });

      return res.status(201).json(groupMember);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
