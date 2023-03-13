const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GuessTheSecretNumberChallenge", async function () {
  let contract;
  let secretNumber;

  before(async function () {
    contract = await (
      await ethers.getContractFactory("GuessTheSecretNumberChallenge")
    ).deploy({ value: ethers.utils.parseEther("1") });

    for (let i = 0; i < 256; i++) {
      if (
        ethers.utils.keccak256(i) ==
        "0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365"
      ) {
        secretNumber = i;
      }
    }
  });

  it("Exploit", async function () {
    await contract.guess(parseInt(secretNumber), {
      value: ethers.utils.parseEther("1"),
    });
  });

  after(async function () {
    expect(await contract.isComplete()).to.be.true;
  });
});
