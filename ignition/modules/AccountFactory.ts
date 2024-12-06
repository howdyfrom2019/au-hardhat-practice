// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AccountFactoryModule = buildModule("AccountFactoryModule", (m) => {
  const accountFactory = m.contract("AccountFactory");

  return { accountFactory };
});

export default AccountFactoryModule;
