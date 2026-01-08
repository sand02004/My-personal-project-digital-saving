// services/groupMember.service.ts
import { GroupMember } from "../database/models/groupmembers";

interface CreateGroupMemberDTO {
  groupId: number;
  userId: number;
  role?: "member" | "admin";
}

export class GroupMemberService {
  /**
   * Creates a new group member
   * @param data
   * @returns created GroupMember
   */
  static async createGroupMember(data: CreateGroupMemberDTO) {
    try {
      // Check if the member already exists to avoid duplicate (optional)
      const existingMember = await GroupMember.findOne({
        where: {
          groupId: data.groupId,
          userId: data.userId,
        },
      });

      if (existingMember) {
        throw new Error("User is already a member of this group.");
      }

      // Create new member
      const groupMember = await GroupMember.create(data);
      return groupMember;
    } catch (error) {
      throw error;
    }
  }
}
