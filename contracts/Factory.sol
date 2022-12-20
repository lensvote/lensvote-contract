// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "hardhat/console.sol";
import "./Governor.sol";
import "./interfaces/ILensHub.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Factory is AccessControl {
    address internal _lensHub;
    mapping(uint256 => address) internal _govMap;

    event LogGovernorCreated(
        uint256 profileId,
        address govAddr,
        address timelockAddr
    );

    constructor(address lensHub) {
        _lensHub = lensHub;
    }

    function createGovernor(uint256 profileId, uint256 timelockDelay) public {
        Governor gov = new Governor(profileId, _lensHub, timelockDelay);
        require(_govMap[profileId] == address(0), "already have gov");
        require(
            IERC721(_lensHub).ownerOf(profileId) == msg.sender ||
                ILensHub(_lensHub).getDispatcher(profileId) == msg.sender,
            "should be the owner of profile"
        );
        _govMap[profileId] = address(gov);
        emit LogGovernorCreated(
            profileId,
            address(gov),
            address(gov.timelock())
        );
    }

    function getGovAddr(uint profileId) public view returns (address) {
        return _govMap[profileId];
    }
}
