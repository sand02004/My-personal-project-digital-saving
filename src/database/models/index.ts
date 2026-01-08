import { initUserModel } from "./user";
import { initContributionModel } from "./contribution";
// import { initGroupMemberModel } from "./groupmembers";


export const allModel = (sequelize: any) => {
  const UserModel = initUserModel(sequelize);
  const ContributionModel = initContributionModel(sequelize);
  // const GroupMemberModel = initGroupMemberModel(sequelize);

  return {
    User: UserModel,
    Contribution: ContributionModel,
    // GroupMember: GroupMemberModel,
  };
};
