#  NFT Marketplace 

This web application is a decentralized NFT marketplace that allows users to create their own NFT collection from images at an IPFS url and view their NFT collection. The app is hosted on Cloudfare IPFS at [](https://cloudflare-ipfs.com/ipfs/QmZg6ajtxp2Pt3CHmc4z6Un1UDVPrp7n2kmfZpBVg3RHJz0)

## Features

- Mint NFTs with custom images and metadata.
- List your NFTs for sale.
- Buy NFTs from the marketplace.
- View your NFT collection.

## Technologies Used

- Smart Contracts: Solidity
- Frontend: ReactJS
- IPFS: For storing NFT images and metadata 
- Blockchain: Sepolia Testnet

### Prerequisites

- [MetaMask](https://metamask.io/) Ethereum wallet provider.

To set up the repository and run the marketplace locally, run the below
```bash
git clone https://github.com/sushma110396/NFT-Project.git
cd NFT-Project
npm install
npm start
```
The app should be available at [Localhost](http://localhost:3000/)

Note: I have used Cloudfare Ipfs to upload the images and metadata to IPFS. (It has been configured in utils.js file) . If cloudfare service is down, then the images for the NFTs might not load properly.
To check if the cloudfare ipfs service is available, please use this link- [Public gateway checker](https://ipfs.github.io/public-gateway-checker/)

