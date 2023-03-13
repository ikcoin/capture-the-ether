const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GuessTheNewNumberChallenge", async function () {
  let contract;
  let hackingContract;

  before(async function () {
    contract = await (
      await ethers.getContractFactory("GuessTheNewNumberChallenge")
    ).deploy({ value: ethers.utils.parseEther("1") });
  });

  it("Exploit", async function () {
    hackingContract = await (
      await ethers.getContractFactory("hackingGuessTheNewNumberChallenge")
    ).deploy(contract.address);

    await hackingContract.exploit({ value: ethers.utils.parseEther("1") });
  });

  after(async function () {
    expect(await contract.isComplete()).to.be.true;
  });
});
