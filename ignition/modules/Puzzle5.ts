// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const Puzzle5 = buildModule("Puzzle5", (m) => {
  const Puzzle5 = m.contract("Puzzle5");

  return { Puzzle5 };
});

export default Puzzle5;
