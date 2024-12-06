// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

// EOA => Proxy => Logic1;
//              => Logic2;

import "./StorageSlot.sol";

contract ProxyCustom {
  /**
   * local value for when not applying storage slot
   */
  // uint x; // 0x0 be aware of collision between proxy and target
  // address implementation;

  function changeImplementation(address _implementation) external {
    // implementation = _implementation;
    StorageSlot.getAddressSlot(keccak256('impl')).value = _implementation;
  }

  fallback() external {
    (bool s, ) = StorageSlot.getAddressSlot(keccak256('impl')).value.delegatecall(msg.data);
    require(s);
  }
}

contract Logic1 {
  uint  x = 0; //0x0

  function changeX(uint _x) external {
    x = _x;
  }
}

contract Logic2 {
  uint  x = 0; //0x0

  function changeX(uint _x) external {
    x = _x;
  }

  function tripleX() external {
    x *= 3;
  }
}