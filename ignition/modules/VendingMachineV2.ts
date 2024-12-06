import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { proxyModule } from "./VendingMachineV1";

const upgradeModule = buildModule("UpgradeModule", (m) => {
  const proxyAdminOwner = m.getAccount(0);

  const { proxyAdmin, proxy } = m.useModule(proxyModule);
  const VendingMachineV2 = m.contract("VendingMachineV2");
  const encodedFunctionName = m.encodeFunctionCall(
    VendingMachineV2,
    "setName",
    ["Version 2"]
  );
  m.call(
    proxyAdmin,
    "upgradeAndCall",
    [proxy, VendingMachineV2, encodedFunctionName],
    {
      from: proxyAdminOwner,
    }
  );

  return { proxyAdmin, proxy };
});

const vendingMachineV2 = buildModule("VendingMachineV2Module", (m) => {
  const { proxy } = m.useModule(upgradeModule);
  const vendingMachine = m.contractAt("VendingMachineV2", proxy);

  return { vendingMachine };
});

export default vendingMachineV2;
