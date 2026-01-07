import { initUserModel } from "./user";
import { initContributionModel } from "./contribution";


export const allModel = (sequelize: any) => {
  const UserModel = initUserModel(sequelize);
  const ContributionModel = initContributionModel(sequelize);

  return {
    User: UserModel,
    Contribution: ContributionModel,
  };
};
