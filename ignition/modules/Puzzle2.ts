// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const Puzzle2 = buildModule("Puzzle2", (m) => {
  const Puzzle2 = m.contract("Puzzle2");

  return { Puzzle2 };
});

export default Puzzle2;
