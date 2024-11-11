// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const GoofyGoober = buildModule("GoofyGoober", (m) => {
  const GoofyGoober = m.contract("GoofyGoober");

  return { GoofyGoober };
});

export default GoofyGoober;
