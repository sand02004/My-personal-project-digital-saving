import { Group } from "../database/models/groups";
import { GroupMember } from "../database/models/groupmembers";
import { User } from "../database/models/user";

export class GroupService {
  // Create a new group
  static async createGroup(
    userId: number,
    data: { name: string; description?: string }
  ) {
    const group = await Group.create(data);

    // Add creator as admin
    await GroupMember.create({
      groupId: group.id,
      userId,
      role: "admin",
    });

    return group;
  }

  // Get a single group by ID
  static async getGroupById(id: number) {
    return await Group.findByPk(id, {
      include: [
        {
          model: GroupMember,
          as: "members",
          include: [{ model: User, as: "user" }],
        },
      ],
    });
  }

  // Get all groups for a user
  static async getMyGroups(userId: number) {
    return await Group.findAll({
      include: [
        {
          model: GroupMember,
          as: "members",
          where: { userId },
        },
      ],
    });
  }

  // Update group (only admin)
  static async updateGroup(
    groupId: number,
    userId: number,
    data: { name?: string; description?: string }
  ) {
    const member = await GroupMember.findOne({
      where: { groupId, userId, role: "admin" },
    });
    if (!member) throw new Error("Only admins can update the group");

    const group = await Group.findByPk(groupId);
    if (!group) throw new Error("Group not found");

    return await group.update(data);
  }

  // Delete group (only admin)
  static async deleteGroup(groupId: number, userId: number) {
    const member = await GroupMember.findOne({
      where: { groupId, userId, role: "admin" },
    });
    if (!member) throw new Error("Only admins can delete the group");

    const group = await Group.findByPk(groupId);
    if (!group) throw new Error("Group not found");

    await group.destroy();
    return true;
  }

  // Add member
  static async addMember(groupId: number, adminId: number, userId: number) {
    const admin = await GroupMember.findOne({
      where: { groupId, userId: adminId, role: "admin" },
    });
    if (!admin) throw new Error("Only admins can add members");

    const existing = await GroupMember.findOne({ where: { groupId, userId } });
    if (existing) throw new Error("User already in group");

    return await GroupMember.create({ groupId, userId, role: "member" });
  }

  // Remove member
  static async removeMember(groupId: number, adminId: number, userId: number) {
    const admin = await GroupMember.findOne({
      where: { groupId, userId: adminId, role: "admin" },
    });
    if (!admin) throw new Error("Only admins can remove members");

    const member = await GroupMember.findOne({ where: { groupId, userId } });
    if (!member) throw new Error("Member not found");

    await member.destroy();
    return true;
  }

  // Get group members
  static async getGroupMembers(groupId: number) {
    return await GroupMember.findAll({
      where: { groupId },
      include: [{ model: User, as: "user" }],
    });
  }
}
