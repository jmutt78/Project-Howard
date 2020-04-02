const { signup } = require("./mutations/user");
const { updatePermissions } = require("./mutations/permissions");

const mutations = {
  //--------------User Mutations --------------------//
  signup,
  updatePermissions
};

module.exports = mutations;
