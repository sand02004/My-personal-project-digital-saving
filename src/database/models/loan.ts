// models/loan.ts
import { DataTypes, Model, Sequelize } from "sequelize";
import { User } from "./user";
import { Group } from "./groups";

interface LoanAttributes {
  id?: number;
  userId: number;
  groupId: number;
  amount: number;
  interestRate: number; // e.g., 5 = 5%
  periodMonths: number;
  status: "pending" | "approved" | "rejected" | "paid";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Loan extends Model<LoanAttributes> implements LoanAttributes {
  public id!: number;
  public userId!: number;
  public groupId!: number;
  public amount!: number;
  public interestRate!: number;
  public periodMonths!: number;
  public status!: "pending" | "approved" | "rejected" | "paid";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initLoanModel = (sequelize: Sequelize) => {
  Loan.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "groups", key: "id" },
        onDelete: "CASCADE",
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      interestRate: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      periodMonths: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected", "paid"),
        defaultValue: "pending",
      },
    },
    {
      tableName: "loans",
      sequelize,
    }
  );

  Loan.belongsTo(User, { foreignKey: "userId", as: "user" });
  Loan.belongsTo(Group, { foreignKey: "groupId", as: "group" });

  return Loan;
};
