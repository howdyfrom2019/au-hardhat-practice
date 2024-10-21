// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const FCFS = buildModule("FCFS", (m) => {
  const FCFS = m.contract("FCFS");

  return { FCFS };
});

export default FCFS;
