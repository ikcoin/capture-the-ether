const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GuessTheNumberChallenge", async function () {
  let contract;

  before(async function () {
    contract = await (
      await ethers.getContractFactory("GuessTheNumberChallenge")
    ).deploy({ value: ethers.utils.parseEther("1") });
  });

  it("Exploit", async function () {
    await contract.guess(parseInt(await ethers.provider.getStorageAt(contract.address, 0)), {
      value: ethers.utils.parseEther("1"),
    });
  });

  after(async function () {
    expect(await contract.isComplete()).to.be.true;
  });
});
