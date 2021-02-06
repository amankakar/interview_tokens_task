var Storage = artifacts.require("./KeyValueStorage.sol");
var Proxy = artifacts.require("./Proxy.sol");

module.exports = async function (deployer, network, accounts) {
  const Key = await deployer.deploy(Storage);
  var add = await Storage.deployed();

  console.log(accounts, "Accounts");
  const proxy = await deployer.deploy(Proxy, add.address, accounts[0]);
};
