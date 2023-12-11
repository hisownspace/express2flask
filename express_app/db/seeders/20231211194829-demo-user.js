"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "demo@aa.io",
          username: "Demo",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "brad@aa.io",
          username: "Brad",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "david@aa.io",
          username: "David",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "andrew@aa.io",
          username: "Andrew",
          hashedPassword: bcrypt.hashSync("password"),
        },
      ],
      { validate: true },
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Demo", "Brad", "Andrew", "David"] },
      },
      {},
    );
  },
};
