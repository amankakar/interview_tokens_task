var Migrations = artifacts.require("./ERC20.sol");

module.exports = function (deployer) {
  deployer.deploy(Migrations, "The NEw Dollar", "TND", 18, 120000);
};
