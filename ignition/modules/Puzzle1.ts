// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const Puzzle1 = buildModule("Puzzle1", (m) => {
  const Puzzle1 = m.contract("Puzzle1");

  return { Puzzle1 };
});

export default Puzzle1;
