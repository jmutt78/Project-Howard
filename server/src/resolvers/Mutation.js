const {
  signup,
  signin,
  signout,
  requestReset,
  resetPassword
} = require("./mutations/user");
const { updatePermissions } = require("./mutations/permissions");

const mutations = {
  //--------------User Mutations --------------------//
  signup,
  updatePermissions,
  signin,
  signout,
  requestReset,
  resetPassword
};

module.exports = mutations;
