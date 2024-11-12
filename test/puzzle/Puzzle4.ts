import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { assert, expect } from "chai";
import hre from "hardhat";

describe("@/test/puzzle/Puzzle4.ts", () => {
  async function deploy() {
    const [eoa1, eoa2] = await hre.ethers.getSigners();
    const Puzzle = await hre.ethers.getContractFactory("Puzzle4");
    const puzzle = await Puzzle.deploy();

    return { puzzle, wallets: [eoa1, eoa2] };
  }

  describe("[Deployment] Puzzle4.ts", () => {
    it("write없이 win을 바로호출하는 경우", async () => {
      const { puzzle, wallets } = await loadFixture(deploy);
      let error;

      try {
        //@ts-ignore
        const tx = await puzzle.connect(wallets[0]).win(wallets[0]);
        await tx.wait();
      } catch (err) {
        error = err;
      }

      expect(
        !(await puzzle.isWon()),
        "win doesn't valid before write() function"
      );
      assert(error, "please write before calling win()");
    });

    it("자신을 먼저 write하는 경우", async () => {
      const { puzzle, wallets } = await loadFixture(deploy);
      let error;

      try {
        const connectedPuzzle = puzzle.connect(wallets[0]);
        //@ts-ignore
        const tx = await connectedPuzzle.write(wallets[0]);
        await tx.wait();
        //@ts-ignore
        await connectedPuzzle.win(wallets[0]);
      } catch (err) {
        error = err;
      }

      expect(
        await puzzle.isWon(),
        "do not allow to refer self account to nested map"
      );
    });

    it("계정 1이 계정2를 write하는 경우", async () => {
      const { puzzle, wallets } = await loadFixture(deploy);
      let error;

      try {
        //@ts-ignore
        const tx = await puzzle.connect(wallets[0]).write(wallets[1]);
        await tx.wait();
        //@ts-ignore
        await puzzle.connect(wallets[1]).win(wallets[0]);
      } catch (err) {
        error = err;
      }

      expect(await puzzle.isWon(), "test1");
    });
  });
});
