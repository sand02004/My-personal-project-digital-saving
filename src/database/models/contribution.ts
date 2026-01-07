import { Model, Optional, Sequelize, DataTypes } from "sequelize";

export interface ContributionAttributes {
  id: number;
  userId: number;
  amount: number;
  status: "pending" | "approved" | "rejected";
  date: Date;
  missedCount?: number; // New: track consecutive misses
  penalty?: number; // New: track accumulated penalties
  isActive?: boolean; // New: inactive after 3 misses
  createdAt?: Date;
  updatedAt?: Date;
}

// Make id optional on creation
interface ContributionCreationAttributes
  extends Optional<
    ContributionAttributes,
    "id" | "missedCount" | "penalty" | "isActive"
  > {}

export class Contribution
  extends Model<ContributionAttributes, ContributionCreationAttributes>
  implements ContributionAttributes
{
  public id!: number;
  public userId!: number;
  public amount!: number;
  public status!: "pending" | "approved" | "rejected";
  public date!: Date;
  public missedCount!: number;
  public penalty!: number;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initContributionModel = (sequelize: Sequelize) => {
  Contribution.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
        allowNull: false,
      },
      date: { type: DataTypes.DATEONLY, allowNull: false },
      missedCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      penalty: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: "contributions",
      sequelize,
    }
  );

  return Contribution;
};
