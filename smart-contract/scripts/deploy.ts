import * as dotenv from "dotenv";
import * as hre from "hardhat";

async function main() {
  console.log("Deploying Contract...");

  const simpleStorageFactory =
    await hre.ethers.deployContract("MiniBusiness");

  await simpleStorageFactory.waitForDeployment();

  // print the address of the deployed contract
  console.log(
    " Contract Address: ",
    simpleStorageFactory.target,
  );

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
