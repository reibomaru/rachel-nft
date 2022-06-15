const { ethers, upgrades } = require("hardhat");

async function main() {
  const Rachel = await ethers.getContractFactory("Rachel");

  const rachel = await upgrades.deployProxy(Rachel, [], {
    initializer: "initialize",
  });
  await rachel.deployed();
  console.log("Contract deployed to address:", rachel.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
