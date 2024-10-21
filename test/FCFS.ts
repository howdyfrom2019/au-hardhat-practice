import { expect } from "chai";
import hre from "hardhat";

describe("FCFS.sol 테스트", () => {
  async function fetchFCFSContract() {
    const contractAddress = "0xa75e2384fBd1Bd493FA37E52fF2be08bb0A69C00";
    const contract = await hre.ethers.getContractAt("FCFS", contractAddress);
    return contract;
  }

  async function fetchFCFSCallerContract() {
    const contractAddress = "0xe5a1631428dE9B38ff59E8C6858E8883CDA70d4D";
    const contract = await hre.ethers.getContractAt(
      "FCFSCaller",
      contractAddress
    );
    return contract;
  }

  it("개인 지갑으로 FCFS.attempt()를 실행시키면 에러가 발생한다.", async () => {
    const contract = await fetchFCFSContract();
    const tx = await contract.attempt();
    const receipt = await tx.wait();
    console.log("FROM EOA", receipt);
    expect(receipt?.status).equal(0);
  });

  it("caller 컨트랙트로 FCFS.attempt()를 실행시키면 성공한다.", async () => {
    const contract = await fetchFCFSCallerContract();
    const fcfsContract = await fetchFCFSContract();
    const tx = await contract.callAttempt(await fcfsContract.getAddress());
    const receipt = await tx.wait();
    console.log("FROM CALLER", receipt);
    expect(receipt?.status).equal(1);
  });
});
