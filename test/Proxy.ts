import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { assert } from "chai";
import hre from "hardhat";

describe("@/test/Proxy.sol", () => {
  async function deploy() {
    const Proxy = await hre.ethers.getContractFactory("ProxyCustom");
    const proxy = await Proxy.deploy();
    await proxy.waitForDeployment();

    const Logic1 = await hre.ethers.getContractFactory("Logic1");
    const logic1 = await Logic1.deploy();
    await logic1.waitForDeployment();

    const Logic2 = await hre.ethers.getContractFactory("Logic2");
    const logic2 = await Logic2.deploy();
    await logic2.waitForDeployment();

    const proxyAsLogic1 = await hre.ethers.getContractAt(
      "Logic1",
      await proxy.getAddress()
    );
    const proxyAsLogic2 = await hre.ethers.getContractAt(
      "Logic2",
      await proxy.getAddress()
    );

    return { proxy, logic1, logic2, proxyAsLogic1, proxyAsLogic2 };
  }

  // eth_getStorageAt
  async function lookupUint(contractAddress: string, slot: string) {
    return parseInt(
      await hre.ethers.provider.getStorage(contractAddress, slot)
    );
  }

  it("Proxy를 사용하여 logic1의 changeX 기능에 접근 가능해야함.", async () => {
    const { proxy, proxyAsLogic1, logic1 } = await loadFixture(deploy);

    await proxy.changeImplementation(await logic1.getAddress());
    assert.equal(await lookupUint(await proxy.getAddress(), "0x0"), 0);

    await proxyAsLogic1.changeX(52);
    const changedX = await lookupUint(await proxy.getAddress(), "0x0");

    console.log("CHANGE X", changedX);
    assert.equal(changedX, 52);
  });

  it("Proxy를 사용하여 logic2의 tripleX 기능에 접근 가능해야함.", async () => {
    const { proxy, proxyAsLogic2, logic2 } = await loadFixture(deploy);

    await proxy.changeImplementation(await logic2.getAddress());
    assert.equal(await lookupUint(await proxy.getAddress(), "0x0"), 0);

    await proxyAsLogic2.changeX(25);
    await proxyAsLogic2.tripleX();

    assert.equal(await lookupUint(await proxy.getAddress(), "0x0"), 75);
  });

  it("implementation을 중간에 업그레이드해도 타깃 컨트랙트의 Storage를 통해 값을 읽어올 수 있어야한다.", async () => {
    const { proxy, logic1, logic2, proxyAsLogic1, proxyAsLogic2 } =
      await loadFixture(deploy);

    // START AT LOGIC1;
    await proxy.changeImplementation(await logic1.getAddress());
    assert.equal(await lookupUint(await proxy.getAddress(), "0x0"), 0);
    await proxyAsLogic1.changeX(45);

    assert.equal(await lookupUint(await proxy.getAddress(), "0x0"), 45);

    // UPGRADE TO LOGIC2;
    await proxy.changeImplementation(await logic2.getAddress());
    assert.equal(await lookupUint(await proxy.getAddress(), "0x0"), 45);

    await proxyAsLogic2.changeX(25);
    await proxyAsLogic2.tripleX();

    assert.equal(await lookupUint(await proxy.getAddress(), "0x0"), 75);
  });
});
