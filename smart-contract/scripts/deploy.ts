import * as dotenv from "dotenv";
import * as hre from "hardhat";

async function main() {
  console.log("Deploying Contract...");

  const zumjiContract =
    await hre.ethers.deployContract("Zumji");

  await zumjiContract.waitForDeployment();

  // print the address of the deployed contract
  console.log(
    " Contract Address: ",
    zumjiContract.target,
  );

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});