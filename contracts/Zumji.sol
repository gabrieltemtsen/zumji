// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";

contract Zumji {
        struct Product {
                    bytes32 cid; // IPFS CID for item details
                            uint256 price; // Price of the product in celoUSD
                                    address seller;
        }

            struct Order {
                        bytes32 productId;
                                address buyer;
                                        uint256 amount;
                                                bool fulfilled;
                                                        bool received;
            }

                mapping(bytes32 => Product) public products;
                    mapping(address => bytes32[]) public userOrders;
                        mapping(bytes32 => Order) public orders;

                            IERC20 public celoUSD;

                                event ProductCreated(bytes32 productId, bytes32 cid, uint256 price, address seller);
                                    event OrderCreated(bytes32 orderId, bytes32 productId, address buyer, uint256 amount);
                                        event OrderFulfilled(bytes32 orderId);
                                            event OrderReceived(bytes32 orderId);

                                                constructor(address _celoUSD) {
                                                            celoUSD = IERC20(_celoUSD);
                                                }

                                                    function createProduct(bytes32 _productId, bytes32 _cid, uint256 _price) external {
                                                                require(products[_productId].seller == address(0), "Product already exists");
                                                                        
                                                                                products[_productId] = Product(_cid, _price, msg.sender);
                                                                                        
                                                                                                emit ProductCreated(_productId, _cid, _price, msg.sender);
                                                    }

                                                        function buyProduct(bytes32 _productId) external {
                                                                    require(products[_productId].seller != address(0), "Product does not exist");
                                                                            
                                                                                    uint256 price = products[_productId].price;
                                                                                            celoUSD.transferFrom(msg.sender, address(this), price);
                                                                                                    
                                                                                                            bytes32 orderId = keccak256(abi.encodePacked(_productId, msg.sender));
                                                                                                                    orders[orderId] = Order(_productId, msg.sender, price, false, false);
                                                                                                                            userOrders[msg.sender].push(orderId);
                                                                                                                                    
                                                                                                                                            emit OrderCreated(orderId, _productId, msg.sender, price);
                                                        }

                                                            function fulfillOrder(bytes32 _orderId) external {
                                                                        require(msg.sender == products[orders[_orderId].productId].seller, "Only the seller can fulfill the order");
                                                                                require(!orders[_orderId].fulfilled, "Order already fulfilled");
                                                                                        
                                                                                                orders[_orderId].fulfilled = true;
                                                                                                        
                                                                                                                emit OrderFulfilled(_orderId);
                                                            }

                                                                function confirmReceipt(bytes32 _orderId) external {
                                                                            require(msg.sender == orders[_orderId].buyer, "Only the buyer can confirm receipt");
                                                                                    require(orders[_orderId].fulfilled, "Order not yet fulfilled");
                                                                                            require(!orders[_orderId].received, "Order already received");
                                                                                                    
                                                                                                            celoUSD.transfer(products[orders[_orderId].productId].seller, orders[_orderId].amount);
                                                                                                                    
                                                                                                                            orders[_orderId].received = true;
                                                                                                                                    
                                                                                                                                            emit OrderReceived(_orderId);
                                                                }

                                                                    function getUserOrders(address _user) external view returns (bytes32[] memory) {
                                                                                return userOrders[_user];
                                                                    }
}.
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
            }
        }
}