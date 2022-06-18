/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
const { API_URL, PRIVATE_KEY, API_MUMBAI_URL } = process.env;
module.exports = {
  solidity: "0.8.2",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
       url: API_URL,
       accounts: [`0x${PRIVATE_KEY}`]
    },
    localhost: {
      url: 'http://localhost:8545',
      accounts: [`0x${PRIVATE_KEY}`]
    },
    mumbai: {
      url: API_MUMBAI_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
