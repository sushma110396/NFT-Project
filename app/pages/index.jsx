import { useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import NFTContractABI from '../path/to/your/contract-abi.json'; // Path to your contract ABI

const nftContractAddress = '0xcc7E1FAC20F9a31B4A1dd77454B7DDC7159dBB7d'; // Your deployed NFT contract address

export default function Home() {
    const [nfts, setNfts] = useState([]); // State to hold the user's NFTs

    async function connectWallet() {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        return provider.getSigner();
    }

    async function createNFT(ipfsURL) {
        const signer = await connectWallet();
        const nftContract = new ethers.Contract(nftContractAddress, NFTContractABI, signer);
        const transaction = await nftContract.createToken(ipfsURL, { value: ethers.utils.parseEther("0.01") }); // Adjust value as per your contract's requirement
        await transaction.wait();
        loadNFTs();
    }

    async function loadNFTs() {
        const signer = await connectWallet();
        const nftContract = new ethers.Contract(nftContractAddress, NFTContractABI, signer);
        const data = await nftContract.getAllNFTs(); // Make sure your contract has this or similar function
        setNfts(data);
    }

    // Call loadNFTs() when the component mounts using useEffect

    return (
        <div>
            <button onClick={() => createNFT('ipfs://your_ipfs_url_here')}>Create NFT</button>
            <div>
                {nfts.map((nft) => (
                    <div key={nft.tokenId}>
                        {/* Display NFT details */}
                        <img src={nft.imageURL} alt={`NFT ${nft.tokenId}`} />
                        <p>Token ID: {nft.tokenId}</p>
                        <p>Owner: {nft.owner}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
