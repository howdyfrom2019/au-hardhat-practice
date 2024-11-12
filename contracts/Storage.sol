// SPDX-LIcense-Identifier: MIT
pragma solidity ^0.8.27;

contract Storage {
  uint256 public slot = 1; // 0x1
  uint256 public slot2 = 2; // 0x2
  mapping(uint => uint) public slot3; // 0x3

  constructor() {
    slot3[10] = 4; // keccak256(10 + 0x3)
    slot3[11] = 5; // keccak256(11 + 0x3)
  }
}