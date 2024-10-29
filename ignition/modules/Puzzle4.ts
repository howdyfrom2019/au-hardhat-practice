// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const Puzzle4 = buildModule("Puzzle4", (m) => {
  const Puzzle4 = m.contract("Puzzle4");

  return { Puzzle4 };
});

export default Puzzle4;
