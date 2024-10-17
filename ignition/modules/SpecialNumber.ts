// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SpecialNumber = buildModule("SpecialNumber", (m) => {
  const SpecialNumber = m.contract("SpecialNumber");

  return { SpecialNumber };
});

export default SpecialNumber;
