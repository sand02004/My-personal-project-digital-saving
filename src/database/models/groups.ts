import { DataTypes, Model, Sequelize } from "sequelize";

interface GroupAttributes {
  id?: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Group extends Model<GroupAttributes> implements GroupAttributes {
  public id!: number;
  public name!: string;
  public description?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initGroupModel = (sequelize: Sequelize) => {
  Group.init(
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
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "groups",
      sequelize,
    }
  );

  return Group;
};
