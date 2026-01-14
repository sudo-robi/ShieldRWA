// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import "../lib/forge-std/src/Script.sol";
import "../src/ComplianceVault.sol";

contract DeployComplianceVault is Script {
    function run() external {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerKey);
        address governor = deployer;
        address settlementAsset = 0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9; // USDC
        address treasury = deployer;

        vm.startBroadcast(deployerKey);
        ComplianceVault vault = new ComplianceVault(
            governor,
            settlementAsset,
            treasury
        );
        vm.stopBroadcast();

        console2.log("ComplianceVault deployed at:", address(vault));
    }
}
