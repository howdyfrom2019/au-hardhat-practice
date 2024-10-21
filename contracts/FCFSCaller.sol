// SPDX-LIcense-Identifier: MIT
pragma solidity ^0.8.27;

interface IFCFS {
  function attempt() external;
}

contract FCFSCaller {
  
  function callAttempt(address target) external {
    IFCFS(target).attempt();
  }
}