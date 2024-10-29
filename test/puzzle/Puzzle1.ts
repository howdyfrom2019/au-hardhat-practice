import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("@/test/puzzle/Puzzle1.ts", () => {
  async function deploy() {
    const [owner] = await hre.ethers.getSigners();
    const Puzzle1 = await hre.ethers.getContractFactory("puzzle/Puzzle1");
    const puzzle1 = await Puzzle1.deploy();

    return { puzzle1, owner };
  }

  describe("[Deployment] puzzle1", () => {
    it("하드햇 설정에 따라, 오너 지갑에서 배포가 되어야한다.", async () => {
      const { owner, puzzle1 } = await loadFixture(deploy);
      expect(await puzzle1.unlock()).to.equal(owner.address);
    });
  });
});
