import { DataTypes, Model, Sequelize } from "sequelize";

interface ContributionAttributes {
    id: number;
    userId: number;
    amount: number;
    status: "pending" | "approved" | "rejected";
    date: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export class contribution
  extends Model<ContributionAttributes>
  implements ContributionAttributes
{
  public id!: number;
  public userId!: number;
  public amount!: number;
  public status!: "pending" | "approved" | "rejected";
  public date!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}    

export const initContributionModel = (sequelize: Sequelize) => {
  contribution.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      tableName: "contributions",
      sequelize,
    }
  );

  return contribution;
};