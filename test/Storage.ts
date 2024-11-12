import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("@/test/Storage", () => {
  async function deploy() {
    const Storage = await hre.ethers.getContractFactory("Storage");
    const storage = await Storage.deploy();
    return { storage };
  }

  describe("[Deployed] Storage", () => {
    it("slot은 `0x1`로 접근 가능합니다.", async () => {
      const { storage } = await loadFixture(deploy);
      const address = await storage.getAddress();
      const valueFromAddress = await hre.ethers.provider.getStorage(address, 0);

      expect(
        parseInt(valueFromAddress) == 1,
        `Expected '1', but get ${valueFromAddress}`
      );
    });

    it("slot2는 `0x2`로 접근 가능합니다.", async () => {
      const { storage } = await loadFixture(deploy);
      const address = await storage.getAddress();
      const valueFromAddress = await hre.ethers.provider.getStorage(address, 1);

      expect(
        parseInt(valueFromAddress) == 2,
        `Expected '2', but got ${valueFromAddress}`
      );
    });

    it("mapping의 각 value는 keccak(key + 0x3)으로 접근 가능합니다.", async () => {
      const { storage } = await loadFixture(deploy);
      const address = await storage.getAddress();
      const key = hre.ethers.zeroPadValue(hre.ethers.toBeHex(10), 32);
      const baseSlot = hre.ethers
        .zeroPadValue(hre.ethers.toBeHex(0x3), 32)
        .slice(2);

      const slot = hre.ethers.keccak256(
        hre.ethers.AbiCoder.defaultAbiCoder().encode(
          ["uint", "uint"],
          [key, baseSlot]
        )
      );
      const value = await hre.ethers.provider.getStorage(address, slot);
      console.log(parseInt(value));
    });
  });
});
