import { ethers, upgrades } from "hardhat"

async function main() {
  const Factory = await ethers.getContractFactory("Factory")
  const lenshubAddress = '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82'
  const factory = await Factory.deploy(lenshubAddress)

  await factory.deployed()

  console.log(
    `Factory deployed to ${factory.address}`,
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
