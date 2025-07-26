const { ethers } = require("hardhat");

async function main() {
  const ZumjiReferral = await ethers.getContractFactory("ZumjiReferral");

  const referral = await ZumjiReferral.deploy(); // deploy the contract
  await referral.waitForDeployment(); // ✅ correctly wait for deployment

  console.log("ZumjiReferral deployed to:", await referral.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
