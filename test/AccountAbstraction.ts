import { assert } from "chai";
import hre from "hardhat";

const FACTORY_NONCE = 1;
const FACTORY_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const ENTRYPOINT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

describe("@/test/AccountAbstraction.sol", () => {
  async function deploy() {
    const EntryPoint = await hre.ethers.getContractFactory("EntryPoint");
    const entry = await EntryPoint.deploy();
    await entry.waitForDeployment();

    const AccountFactory = await hre.ethers.getContractFactory(
      "AccountFactory"
    );
    const factory = await AccountFactory.deploy();
    await factory.waitForDeployment();
    return { entry, factory };
  }

  it("entry 배포", async () => {
    const [signer] = await hre.ethers.getSigners();
    const owner = await signer.getAddress();

    const entryPoint = await hre.ethers.getContractAt(
      "EntryPoint",
      ENTRYPOINT_ADDRESS
    );
    const sender = hre.ethers.getCreateAddress({
      from: FACTORY_ADDRESS,
      nonce: FACTORY_NONCE,
    });

    const AccountFactory = await hre.ethers.getContractFactory(
      "AccountFactory"
    );
    const initCode =
      FACTORY_ADDRESS +
      AccountFactory.interface
        .encodeFunctionData("createAccount", [owner])
        .slice(2);

    // CREATE: hash(sender{ deployer } + nonce);
    // CREATE2: hash(0xFF + sender + bytecode + salt);

    await entryPoint.depositTo(sender, {
      value: hre.ethers.parseEther("100"),
    });
    const Account = await hre.ethers.getContractFactory("Account");
    const userOp = {
      sender, // smart account address
      nonce: await entryPoint.getNonce(sender, 0),
      initCode,
      callData: Account.interface.encodeFunctionData("execute"),
      callGasLimit: 200_000,
      verificationGasLimit: 200_000,
      preVerificationGas: 50_000,
      maxFeePerGas: hre.ethers.parseUnits("10", "gwei"),
      maxPriorityFeePerGas: hre.ethers.parseUnits("5", "gwei"),
      paymasterAndData: "0x",
      signature: "0x",
    };

    const tx = await entryPoint.handleOps([userOp], owner);
    const receipt = await tx.wait();
    console.log(receipt);

    assert(receipt, "No receipt issued");
  });
});
