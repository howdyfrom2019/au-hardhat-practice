import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { assert, expect } from "chai";
import hre from "hardhat";

describe("@/test/puzzle/Puzzle1.ts", () => {
  async function deploy() {
    const [owner] = await hre.ethers.getSigners();
    const Puzzle1 = await hre.ethers.getContractFactory("Puzzle1");
    const puzzle1 = await Puzzle1.deploy();

    return { puzzle1, owner };
  }

  describe("[Deployment] puzzle1", () => {
    it("unlock을 실행시키지 않고 푸는 것을 방지해야한다.", async () => {
      const { puzzle1 } = await loadFixture(deploy);
      let error;
      try {
        await puzzle1.win();
      } catch (err) {
        error = err;
      }

      assert(error, "win is not allowed before unlock");
    });
    it("unlock을 실행시킨 뒤엔, 퍼즐해결이 가능하다.", async () => {
      const { owner, puzzle1 } = await loadFixture(deploy);
      let error;
      try {
        await puzzle1.unlock();
        await puzzle1.win();
      } catch (err) {
        error = err;
      }
      expect(await puzzle1.isWon()).to.be.true;
    });
  });
});
