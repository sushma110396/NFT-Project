#  NFT Marketplace 

This web application is a decentralized NFT marketplace that allows users to create their own NFT collection from images at an IPFS url and view their NFT collection. The app is hosted on Cloudfare IPFS at [Cloudfare IPFS URL](https://cloudflare-ipfs.com/ipfs/QmZg6ajtxp2Pt3CHmc4z6Un1UDVPrp7n2kmfZpBVg3RHJz)

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

To set up the repository, run the below
```bash
git clone https://github.com/sushma110396/NFT-Project.git
cd NFT-Project
npm install
```

Create a new .env file in the root of your project, which is right inside the NFT-Project folder, and add:
1)The Alchemy API URL 
2)The private key of the MetaMask wallet

When you're done, your .env file should look like this:

REACT_APP_ALCHEMY_API_URL="<YOUR_API_URL>"

REACT_APP_PRIVATE_KEY="<YOUR_PRIVATE_KEY>"

On running npm start,the app should be available at [Localhost](http://localhost:3000/)

Note: I have used Cloudfare Ipfs to upload the images and metadata to IPFS. (It has been configured in utils.js file) . If cloudfare service is down, then the images for the NFTs might not load properly.
To check if the cloudfare ipfs service is available, please use this link- [Public gateway checker](https://ipfs.github.io/public-gateway-checker/)

Here are a few screenshots of the app hosted on IPFS:
![marketplace](https://github.com/sushma110396/NFT-Project/assets/122709593/7b97c1a7-37a5-4db9-8d3d-181129cf6a2a)
![upload](https://github.com/sushma110396/NFT-Project/assets/122709593/bacb07f9-d330-4e95-b953-54a786fabbf4) 
![profile](https://github.com/sushma110396/NFT-Project/assets/122709593/ba73b73e-5cd5-4630-9922-74e570b73da8)
