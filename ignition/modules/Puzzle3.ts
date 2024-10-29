// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const Puzzle3 = buildModule("Puzzle3", (m) => {
  const Puzzle3 = m.contract("Puzzle3");

  return { Puzzle3 };
});

export default Puzzle3;
