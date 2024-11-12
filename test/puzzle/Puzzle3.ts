import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { parseEther } from "ethers";
import hre from "hardhat";

describe("@/test/puzzle/Puzzle3.ts", () => {
  async function deploy() {
    const [eoa1, eoa2, eoa3] = await hre.ethers.getSigners();
    const Puzzle = await hre.ethers.getContractFactory("Puzzle3");
    const puzzle = await Puzzle.deploy();

    return { puzzle, wallets: [eoa1, eoa2, eoa3] };
  }

  describe("[Deployment] puzzle3", () => {
    it("계정 세개로 구매한 이후엔 퍼즐을 풀수 잇습니다.", async () => {
      const { puzzle, wallets } = await loadFixture(deploy);
      let error;
      try {
        for (let i = 0; i < wallets.length; i++) {
          const tx = await puzzle
            .connect(wallets[i])
            //@ts-ignore
            .buy({ value: parseEther(`${0.0001 * (i + 1)}`) });
          await tx.wait();
        }
        await puzzle.win(wallets[1], wallets[2], wallets[0]);
      } catch (err) {
        error = err;
      }

      expect(
        await puzzle.isWon(),
        "please check again the order of each address"
      );
    });
  });
});
