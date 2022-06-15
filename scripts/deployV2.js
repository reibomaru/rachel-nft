const { ethers, upgrades } = require("hardhat");

const contractAddress = process.env.CONTRACT_ADDRESS;

async function main() {
  console.log("start to deploy:", "RachelV2");
  const RachelV2 = await ethers.getContractFactory("RachelV2");
  const rachelV2 = await upgrades.upgradeProxy(contractAddress, RachelV2);
  await rachelV2.deployed();
  console.log("Contract deployed to address:", rachelV2.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
