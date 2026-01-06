import { DataTypes, Model, Sequelize } from "sequelize";
import { Group } from "./groups.js";
import { User } from "./user.js";

interface GroupMemberAttributes {
  id?: number;
  groupId: number;
  userId: number;
  role?: "member" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}

export class GroupMember
  extends Model<GroupMemberAttributes>
  implements GroupMemberAttributes
{
  public id!: number;
  public groupId!: number;
  public userId!: number;
  public role?: "member" | "admin";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initGroupMemberModel = (sequelize: Sequelize) => {
  GroupMember.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "groups",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      role: {
        type: DataTypes.ENUM("member", "admin"),
        defaultValue: "member",
      },
    },
    {
      tableName: "group_members",
      sequelize,
    }
  );

  // Define associations
  GroupMember.belongsTo(Group, { foreignKey: "groupId", as: "group" });
  GroupMember.belongsTo(User, { foreignKey: "userId", as: "user" });

  return GroupMember;
};
