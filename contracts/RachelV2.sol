//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./Rachel.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";

contract RachelV2 is Rachel, ERC721EnumerableUpgradeable {
    bool initializedV2;
    using CountersUpgradeable for CountersUpgradeable.Counter;

    function initializeV2() public initializer {
        require(!initializedV2);
        initializedV2 = true;
        __ERC721Enumerable_init();
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    )
        internal
        virtual
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
    {
        ERC721EnumerableUpgradeable._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        virtual
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
    {
        ERC721Upgradeable._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
        returns (bool)
    {
        return ERC721Upgradeable.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        return ERC721URIStorageUpgradeable.tokenURI(tokenId);
    }

    struct NFT {
        uint32 token;
        string uri;
    }

    function getMyNFTs() public view returns (NFT[] memory) {
        address sender = msg.sender;
        uint256 numberOfNFTs = balanceOf(sender);
        NFT[] memory nfts = new NFT[](numberOfNFTs);
        for (uint256 index = 0; index < numberOfNFTs; index++) {
            uint256 token = tokenOfOwnerByIndex(sender, index);
            nfts[index].uri = tokenURI(token);
            nfts[index].token = uint32(token);
        }
        return nfts;
    }

    function mintNFTFromUser(string memory uri) public {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, uri);
    }

    function getCountOfAllNFTs() public view returns (uint256) {
        return _tokenIds.current();
    }
}
