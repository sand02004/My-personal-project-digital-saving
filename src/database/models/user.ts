import { DataTypes, Model, Sequelize } from "sequelize";

interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  acceptedTerms?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public phone?: string; 
  public acceptedTerms?: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Use a function to initialize the model
export const initUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      acceptedTerms: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      tableName: "users",
      sequelize,
    }
  );

  return User;
};
