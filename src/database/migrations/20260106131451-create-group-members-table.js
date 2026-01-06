"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("group_members", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "groups", // must match table name
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users", // must match table name
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      role: {
        type: Sequelize.ENUM("member", "admin"),
        allowNull: false,
        defaultValue: "member",
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop ENUM type first (important in Postgres)
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_group_members_role";'
    );
    await queryInterface.dropTable("group_members");
  },
};
