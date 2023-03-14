pragma solidity ^0.4.21;

contract hackingRetirementFundChallenge {
    address owner;

    function hackingRetirementFundChallenge() public payable {
        require(msg.value == 0.5 ether);
        owner = msg.sender;
    }

    function destructContract(address _destination) public {
        require(msg.sender == owner);

        selfdestruct(_destination);
    }

}