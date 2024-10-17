// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract SpecialNumber {
    address author1;
    address author2;

    receive() external payable {
        // msg.value is passed to this contract
        uint totalValue = msg.value;

        // make a call to author1 sending half of the ether
        (bool success1, ) = author1.call{ value: totalValue / 2 }("");
        require(success1);

        // make a call to author2 sending half of the ether
        (bool success2, ) = author2.call{ value: totalValue / 2 }("");
        require(success2);
    }
}