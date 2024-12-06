import { expect } from "chai";
import hre from "hardhat";
import VendingMachineV1 from "../ignition/modules/VendingMachineV1";
import VendingMachineV2 from "../ignition/modules/VendingMachineV2";

describe("@/test/UpgradableVendingMachine", () => {
  it("배포한 Proxy 컨트랙트의 주소와 Implementation 주소는 달라야한다.", async () => {
    const VendingMachineV1 = await hre.ethers.getContractFactory(
      "VendingMachineV1"
    );
    const proxy = await hre.upgrades.deployProxy(VendingMachineV1, [100], {
      initializer: "initialize",
    });
    const implementationAddress =
      await hre.upgrades.erc1967.getImplementationAddress(
        await proxy.getAddress()
      );

    console.log("Proxy contract address: ", await proxy.getAddress());
    console.log("Implementation contract address: ", implementationAddress);
  });

  // it("Ignition을 사용한 배포에서는 초기값이 100으로 설정되어있다.", async () => {
  //   const [, secondAccount] = await hre.ethers.getSigners();
  //   const { vendingMachine } = await hre.ignition.deploy(VendingMachineV1);
  //   // @ts-ignore
  //   expect(await vendingMachine.connect(secondAccount).numSodas()).to.equal(
  //     100
  //   );
  // });

  it("Proxy 컨트랙트에 접근해도 Implementation 컨트랙트의 변수에 접근 가능할 것.", async () => {
    const [, secondAccount] = await hre.ethers.getSigners();
    const { vendingMachine } = await hre.ignition.deploy(VendingMachineV1);
    // @ts-ignore
    expect(await vendingMachine.connect(secondAccount).version()).to.equal(
      "1.0.0"
    );
  });

  it("Upgrading 이후에는 V2 컨트랙트에 접근되어야한다.", async () => {
    const [, secondAccount] = await hre.ethers.getSigners();
    const { vendingMachine } = await hre.ignition.deploy(VendingMachineV2);

    //@ts-ignore
    expect(await vendingMachine.connect(secondAccount).version()).to.equal(
      "2.0.0"
    );
  });
});
