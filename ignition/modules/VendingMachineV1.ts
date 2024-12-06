import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
export const proxyModule = buildModule("ProxyModule", (m) => {
  const proxyAdminOwner = m.getAccount(0);

  const vendingMachine1 = m.contract("VendingMachineV1");
  const proxy = m.contract("TransparentUpgradeableProxy", [
    vendingMachine1,
    proxyAdminOwner,
    "0x",
  ]);

  const proxyAdminAddress = m.readEventArgument(
    proxy,
    "AdminChanged",
    "newAdmin"
  );

  const proxyAdmin = m.contractAt("ProxyAdmin", proxyAdminAddress);
  return { proxyAdmin, proxy };
});

const vendingMachineV1 = buildModule("VendingMachineV1Module", (m) => {
  const { proxy, proxyAdmin } = m.useModule(proxyModule);
  const vendingMachine = m.contractAt("VendingMachineV1", proxy);

  return { vendingMachine, proxy, proxyAdmin };
});

export default vendingMachineV1;
