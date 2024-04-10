#  NFT Marketplace 

This web application is a decentralized NFT marketplace that allows users to create their own NFT collection from images at an IPFS url and view their NFT collection. The app is hosted on Cloudfare IPFS at [Cloudfare IPFS URL](https://cloudflare-ipfs.com/ipfs/QmZg6ajtxp2Pt3CHmc4z6Un1UDVPrp7n2kmfZpBVg3RHJz)

## Features

- Mint NFTs with custom images and metadata.
- List your NFTs for sale.
- Buy NFTs from the marketplace. using ETH/ERC 20 tokens
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

Guide to use the application:
1)Once the app loads, connect your metamask wallet by clicking "Connect Wallet" button. Make sure you have sufficient ETH in your wallet. Also, ensure you are on the Sepolia test network.

2)Go to List My NFt tab and add your NFT to the marketplace by filling in the form.

![List NFT](https://github.com/sushma110396/NFT-Project/assets/122709593/8bf64e07-cd46-4143-86ff-96c401e8a4f1)

3)Once your NFT is successfully listed on the marketplace, you can view the NFT on the Marketplace tab.


![marketplace](https://github.com/sushma110396/NFT-Project/assets/122709593/f460cbc2-10a2-41ef-941b-43dc7198eed3)

4)Click on any of the NFT images to view the NFT detail page. Now switch to a different account on your wallet to test the Buy NFT functionality. You can buy NFT using either ETH/ERC 20 tokens by choosing the approprtate option from the dropdown and clicking on the buy button.

![Buy NFT](https://github.com/sushma110396/NFT-Project/assets/122709593/e8c1b5f2-a4f3-49f3-99a9-86180243e771)
