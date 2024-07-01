// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MiniBusiness {
    uint256 public businessWorth = 2 ether;
    string[] public goods;

    struct Item {
        uint256 price;
        uint256 quantity;
    }

    mapping(string => Item) public items;

    address public owner;

    event GoodAdded(string name, uint256 price, uint256 quantity);
    event GoodBought(address buyer, string name, uint256 quantity);
    event FundsWithdrawn(address owner, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        // Handle the received Ether
    }

    function addGood(string memory name, uint256 price, uint256 quantity) public onlyOwner {
        require(price > 0, "Price should be greater than zero");
        require(quantity > 0, "Quantity should be greater than zero");

        goods.push(name);
        items[name] = Item(price, quantity);

        emit GoodAdded(name, price, quantity);
    }

    function buyGood(string memory name, uint256 quantity) public payable {
        Item storage item = items[name];
        require(quantity > 0, "Quantity should be greater than zero");
        require(quantity <= item.quantity, "Not enough items in stock");
        uint256 totalPrice = item.price * quantity;
        require(msg.value >= totalPrice, "Not enough Ether sent");

        item.quantity -= quantity;
        emit GoodBought(msg.sender, name, quantity);

        // Refund any excess ether sent
        if (msg.value > totalPrice) {
            payable(msg.sender).transfer(msg.value - totalPrice);
        }
    }

    function withdrawFunds() public onlyOwner {
        uint256 amount = address(this).balance;
        require(amount > 0, "No funds to withdraw");
        payable(owner).transfer(amount);
        emit FundsWithdrawn(owner, amount);
    }

    function getGoods() public view returns (string[] memory) {
        return goods;
    }
}