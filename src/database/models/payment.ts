import { DataTypes, Model, Sequelize } from "sequelize";
import { User } from "./user.js";

interface PaymentAttributes {
  id?: number;
  userId: number;
  amount: number;
  status: "pending" | "success" | "failed";
  method: string;
  transactionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Payment
  extends Model<PaymentAttributes>
  implements PaymentAttributes
{
  public id!: number;
  public userId!: number;
  public amount!: number;
  public status!: "pending" | "success" | "failed";
  public method!: string;
  public transactionId?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Function to initialize the model
export const initPaymentModel = (sequelize: Sequelize) => {
  Payment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "success", "failed"),
        defaultValue: "pending",
        allowNull: false,
      },
      method: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      transactionId: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true,
      },
    },
    {
      tableName: "payments",
      sequelize,
    }
  );

  Payment.belongsTo(User, { foreignKey: "userId", as: "user" });

  return Payment;
};
