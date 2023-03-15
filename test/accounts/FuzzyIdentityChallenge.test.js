const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FuzzyIdentityChallenge", async function () {
  let contract;

  before(async function () {
    contract = await (await ethers.getContractFactory("FuzzyIdentityChallenge")).deploy();
  });

  it("Exploit", async function () {
    hackingContract = await (
      await ethers.getContractFactory("hackingFuzzyIdentityChallenge")
    ).deploy();
  });

  after(async function () {
    expect(await contract.isSmarx(hackingContract.address)).to.be.true;
  });
});
