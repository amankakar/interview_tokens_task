module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

  // networks: {
  //   development: {
  //     host: "localhost",
  //     port: 8545,
  //     network_id: "*", // Match any network id
  //     //from: '0xcc42b083231d36976a1e018ee219fd37f0079741'
  //   },
  // },
  compilers: {
    solc: {
      version: "0.6.8", // Fetch exact version from solc-bin (default: truffle's version)
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
