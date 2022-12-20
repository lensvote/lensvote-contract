import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@openzeppelin/hardhat-upgrades"
import * as dotenv from "dotenv"

dotenv.config()

const ACCOUNT = process.env.account

if (!ACCOUNT) {
  throw "Please specify your account at .env"
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    mumbai: {
      accounts: [ACCOUNT],
      url: "https://matic-mumbai.chainstacklabs.com",
    },
  },
}

export default config
