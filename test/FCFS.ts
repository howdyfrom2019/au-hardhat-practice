import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("FCFS.sol 테스트", () => {
  async function deploySpecialNumber() {
    const factory = await hre.ethers.getContractFactory("FCFS");
    const contract = await factory.deploy();
    await contract.waitForDeployment();
    const address = await contract.getAddress();

    console.log("FCFS deployed to:", address);

    return { address };
  }

  it("[Deployment] 올바른 address를 리턴한다.", async () => {
    const { address } = await loadFixture(deploySpecialNumber);
    expect(address.length).equal(42);
  });
});