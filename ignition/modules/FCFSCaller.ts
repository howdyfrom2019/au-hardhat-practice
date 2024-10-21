// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const FCFSCaller = buildModule("FCFSCaller", (m) => {
  const FCFSCaller = m.contract("FCFSCaller");

  return { FCFSCaller };
});

export default FCFSCaller;
