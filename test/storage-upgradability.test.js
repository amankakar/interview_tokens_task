/* global describe it artifacts */

const KeyValueStorage = artifacts.require("KeyValueStorage");
const DelegateV1 = artifacts.require("DelegateV1");
const DelegateV2 = artifacts.require("DelegateV2");
const Proxy = artifacts.require("Proxy");
const ERC20 = artifacts.require("ERC20");

contract("Storage and upgradability example", async (accounts) => {
  it("should create and upgrade idap token", async () => {
    // const keyValueStorage = await KeyValueStorage.deployed();
    // let proxy = await Proxy.deployed(); //(keyValueStorage.address, accounts[2]);
    // const delegateV1 = await DelegateV1.new();
    // const delegateV2 = await DelegateV2.new();
    // const erc20 = await ERC20.deployed(); //.new("The New Dollar", "TND", 18, 2000000);
    // console.log(delegateV1.address);
    // await proxy.upgradeTo(erc20.address);

    // proxy = _.extend(proxy, await ERC20.at(proxy.address));
    // const total_s = await proxy.totalSupply();
    // console.log(total_s.toNumber());
    // console.log(proxy.address);

    // await proxy.setNumberOfOwners(10);
    // let numOwnerV1 = await proxy.getNumberOfOwners();
    // console.log(numOwnerV1.toNumber());
    // //code before the pause
    // setTimeout(async function () {
    //   //do what you need here
    //   await proxy.upgradeTo(delegateV2.address);
    // }, 100);

    // proxy = await DelegateV2.at(proxy.address);
    // let previousOwnersState = await proxy.getNumberOfOwners();
    // console.log(previousOwnersState.toNumber());
    // await proxy.setNumberOfOwners(20, { from: accounts[2] });

    // let numOfownersV2 = await proxy.getNumberOfOwners();
    // console.log(numOfownersV2.toNumber());

    const keyValueStorage = await KeyValueStorage.new();
    let proxy = await Proxy.new(keyValueStorage.address, accounts[2]);
    const delegateV1 = await DelegateV1.new();
    const delegateV2 = await DelegateV2.new();

    await proxy.upgradeTo(delegateV1.address);

    proxy = _.extend(proxy, await DelegateV1.at(proxy.address));

    await proxy.setNumberOfOwners(10);
    let numOwnerV1 = await proxy.getNumberOfOwners();
    console.log(numOwnerV1.toNumber());

    await proxy.upgradeTo(delegateV2.address);

    proxy = await DelegateV2.at(proxy.address);
    let previousOwnersState = await proxy.getNumberOfOwners();
    console.log(previousOwnersState.toNumber());
    await proxy.setNumberOfOwners(20, { from: accounts[2] });

    let numOfownersV2 = await proxy.getNumberOfOwners();
    console.log(numOfownersV2.toNumber());
  });
});

https://github.com/expanse-org/Tokens/blob/master/Token_Contracts/contracts/Token.sol
https://github.com/Quillhash/upradeableToken