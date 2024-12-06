// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const EntryPointModule = buildModule("EntryPointModule", (m) => {
  const entrypoint = m.contract("EntryPoint");

  return { entrypoint };
});

export default EntryPointModule;
