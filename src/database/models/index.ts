import { initUserModel } from "./user";
import { initGroupModel } from "./groups";
import { initGroupMemberModel } from "./groupmembers";


export const allModel = (sequelize: any) => {

  const User = initUserModel(sequelize);
  const Group = initGroupModel(sequelize);
  const GroupMember = initGroupMemberModel(sequelize);

 
  User.belongsToMany(Group, {
    through: GroupMember,
    foreignKey: "userId",
    otherKey: "groupId",
    as: "groups",
  });

  Group.belongsToMany(User, {
    through: GroupMember,
    foreignKey: "groupId",
    otherKey: "userId",
    as: "members",
  });

  
  User.hasMany(GroupMember, {
    foreignKey: "userId",
    as: "memberships",
  });

  Group.hasMany(GroupMember, {
    foreignKey: "groupId",
    as: "groupMembers",
  });

  GroupMember.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  GroupMember.belongsTo(Group, {
    foreignKey: "groupId",
    as: "group",
  });

  return {
    User,
    Group,
    GroupMember,
   
  };
};
