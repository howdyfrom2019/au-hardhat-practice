import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import hre from "hardhat";

describe("FCFS.sol 테스트", () => {
  const fcfsAddress = "0xa75e2384fBd1Bd493FA37E52fF2be08bb0A69C00";
  const fcfsCallerAddress = "0xe5a1631428dE9B38ff59E8C6858E8883CDA70d4D";
  let testEOA: HardhatEthersSigner;

  before(async () => {
    [testEOA] = await hre.ethers.getSigners();
    console.log("EOA Address:", testEOA);
  });

  it("개인 지갑으로 FCFS.attempt()를 실행시키면 에러가 발생한다.", async () => {
    const contract = new hre.ethers.Contract(
      fcfsAddress,
      [
        {
          inputs: [],
          name: "attempt",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      testEOA
    );
    const tx = await contract.attempt();
    console.log("Transaction sent from EOA:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction mined from EOA:", receipt);
  });

  it("caller 컨트랙트로 FCFS.attempt()를 실행시키면 성공한다.", async () => {
    const contract = new hre.ethers.Contract(
      fcfsCallerAddress,
      [
        {
          inputs: [
            {
              internalType: "address",
              name: "target",
              type: "address",
            },
          ],
          name: "callAttempt",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      testEOA
    );
    const tx = await contract.callAttempt(fcfsAddress);
    const receipt = await tx.wait();
    console.log("FROM CALLER", receipt);
    expect(receipt?.status).equal(1);
  });
});
