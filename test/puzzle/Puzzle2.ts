import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { assert, expect } from "chai";
import hre from "hardhat";

describe("@/test/puzzle/Puzzle2.ts", () => {
  async function deploy() {
    const [owner] = await hre.ethers.getSigners();
    const Puzzle = await hre.ethers.getContractFactory("Puzzle2");
    const puzzle = await Puzzle.deploy();

    return { puzzle, owner };
  }

  describe("[Deployment] puzzle2", () => {
    it("스위치 실행시키지 않고 푸는 것을 방지해야한다.", async () => {
      const { puzzle } = await loadFixture(deploy);
      let error;
      try {
        await puzzle.win();
      } catch (err) {
        error = err;
      }

      assert(error, "win is not allowed before unlock");
    });
    it("특정 스위치 커맨드를 작동시킨 이후에 퍼즐을 풀 수 있다.", async () => {
      const { owner, puzzle } = await loadFixture(deploy);
      let error;
      try {
        await puzzle.switchOn(20);
        await puzzle.switchOn(47);
        await puzzle.switchOn(212);
        await puzzle.win();
      } catch (err) {
        error = err;
      }
      expect(await puzzle.isWon()).to.be.true;
    });
  });
});
