import { ethers } from "hardhat"
import art from "../artifacts/contracts/Governor.sol/Governor.json"
import followNftArt from "../artifacts/contracts/interfaces/IFollowNFT.sol/IFollowNFT.json"
import factoryArt from "../artifacts/contracts/Factory.sol/Factory.json"

// In second
// const POLY_BLOCK_TIME = 2
const FOLLOWER_NFT_ADDR = "0x15F9637354045941a119a2B6E59465D1d26Ef440"
const FACTORY_ADDR = "0x0728c203321c2280e3e14CF65ae493885028674E"

enum VoteAction {
  against,
  for,
  abstain,
}

const RECEIVER_ADDR_FIRST = "0x0000000000000000000000000000000000000010"
const RECEIVER_ADDR_SECOND = "0x0000000000000000000000000000000000000011"

async function voteLogic() {
  const signers = await ethers.getSigners()
  const owner = signers[0]

  const followNftContract = new ethers.Contract(
    FOLLOWER_NFT_ADDR,
    followNftArt.abi,
    owner,
  )
  const factoryContract = new ethers.Contract(
    FACTORY_ADDR,
    factoryArt.abi,
    owner,
  )

  const profileId = "0x5d40"
  // Enable governor
  // const creationTx = await factoryContract.createGovernor(profileId, 0)
  // console.log("🚀 ~ file: test.ts:39 ~ voteLogic ~ creationTx", creationTx)
  // await creationTx?.wait?.()

  // console.log("🚀 ~ file: test.ts:35 ~ mint ~ latestProposal", latestProposal)

  const governorAddress = await factoryContract.getGovAddr(profileId)
  console.log(
    "🚀 ~ file: test.ts:49 ~ voteLogic ~ governorAddress",
    governorAddress,
  )
  const governorContract = new ethers.Contract(governorAddress, art.abi, owner)
  const adminAddr = await governorContract.admin()
  console.log("🚀 ~ file: test.ts:51 ~ voteLogic ~ adminAddr", adminAddr)

  // const transferAmount = parseEther("0.000001")
  // // Propose
  // const propose = async () => {
  //   // const latestBlockNumber = await ethers.provider.getBlockNumber()
  //   // const { hash: latestBlockHash } = await ethers.provider.getBlock(
  //   //   latestBlockNumber,
  //   // )
  //   // const lessThanEight = Number(latestBlockHash) < 8

  //   // let receiptor
  //   // if (isEven) {

  //   // }

  //   const proposeId = await governorContract.propose(
  //     //
  //     [RECEIVER_ADDR_FIRST, RECEIVER_ADDR_SECOND],
  //     [transferAmount, transferAmount],
  //     [0, 0],
  //     [0, 0],
  //     "test_2022_12_18_3",
  //     60,
  //     0,
  //     1,
  //   )

  //   return proposeId
  // }
  // console.log("awaiting for propose transaction...")
  // console.log(await propose())

  // Delegate
  // const delegationTx: TransactionResponse = await followNftContract.delegate(
  //   owner.address,
  // )
  // console.log("waiting for delegation done!...")
  // // Await for delegation transaction complete
  // await delegationTx.wait()
  // console.log("delegation done! lets vote")

  // const power = await followNftContract.getPowerByBlockNumber(owner.address, 29812191)
  // console.log(power)

  const getLatestProposal = async () => {
    const latestProposalId = await governorContract.latestProposalIds(
      owner.address,
    )
    const proposal = await governorContract.proposals(latestProposalId)
    return proposal
  }

  const latestProposal = await getLatestProposal()
  console.log(
    "🚀 ~ file: test.ts:89 ~ voteLogic ~ latestProposal",
    latestProposal,
  )

  // Cancel Proposal
  // const cancelProposal = async (id: BigNumberish) => {
  //   const cancelTx = await governorContract.cancel(id)
  //   return cancelTx
  // }
  // console.log(await cancelProposal(latestProposal.id))

  // Vote
  // const voteReturn = await governorContract.castVote(
  //   latestProposal.id,
  //   VoteAction.for,
  // )
  // console.log("🚀 ~ file: test.ts:77 ~ mint ~ voteReturn", voteReturn)
  // await voteReturn?.wait?.()

  // Queue
  // const queueTx = await governorContract.queue(latestProposal.id)
  // console.log("🚀 ~ file: test.ts:89 ~ voteLogic ~ queueTx", queueTx)
  // await queueTx?.wait?.()

  // Execute
  // const executeTx = await governorContract.execute(latestProposal.id, {
  //   value: transferAmount.mul(2),
  // })
  // console.log("🚀 ~ file: test.ts:94 ~ voteLogic ~ executeTx", executeTx)
  // await executeTx?.wait?.()

  // const newProposals = await governorContract.proposals(latestProposal.id)
  // const state = await governorContract.state(latestProposal.id)
  // console.log("Vote success, 🚀 checkout the new state", state, newProposals)
}

voteLogic().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
