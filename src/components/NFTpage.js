import Navbar from "./Navbar";

import { useParams } from 'react-router-dom';
import MarketplaceJSON from "../Marketplace.json";
import myERC20Token from "../myERC20Token.json";
import nftMarketplaceERC20Payment from "../nftMarketplaceERC20Payment.json"
import axios from "axios";
import { useState } from "react";
import { GetIpfsUrlFromPinata } from "../utils";
import { useEffect } from "react";

export default function NFTPage(props) {

    const [data, updateData] = useState({});
    const [dataFetched, updateDataFetched] = useState(false);
    const [message, updateMessage] = useState("");
    const [currAddress, updateCurrAddress] = useState("0x");
    const [paymentMethod, setPaymentMethod] = useState('ETH');
    const [isOwner, setIsOwner] = useState(false);

    const erc20TokenAddress = myERC20Token.address;// ERC20 Token Address
    const erc20TokenAbi = myERC20Token.abi; // ERC20 Token ABI

    async function getNFTData(tokenId) {
        const ethers = require("ethers");

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
       

        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)

        var tokenURI = await contract.tokenURI(tokenId);
        const listedToken = await contract.getListedTokenForId(tokenId);
        tokenURI = GetIpfsUrlFromPinata(tokenURI);
        let meta = await axios.get(tokenURI);
        meta = meta.data;
        console.log(listedToken);
        
        setIsOwner(listedToken.owner.toLowerCase() === addr.toLowerCase());
        let item = {
            price: meta.price,
            tokenId: tokenId,
            seller: listedToken.seller,
            owner: listedToken.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        console.log(item);
        updateData(item);
        updateDataFetched(true);
        //console.log("address", addr)
        updateCurrAddress(addr);
        console.log("address", addr);
        console.log("seller ", listedToken.seller);
    }

    async function buyNFT(tokenId) {
        try {
            const ethers = require("ethers");

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();


            let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);
            const salePrice = ethers.utils.parseUnits(data.price, 'ether')
            updateMessage("Buying the NFT... Please Wait (Upto 5 mins)")

            let transaction = await contract.executeSale(tokenId, { value: salePrice });
            await transaction.wait();
            await getNFTData(tokenId);
            alert('You successfully bought the NFT!');
            updateMessage("");
        }
        catch (e) {
            alert("Upload Error" + e)
        }
    }

    async function buyNFTWithERC20(tokenId) {
        try {
            const ethers = require("ethers");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Add ERC20 Token Contract
            let erc20Contract = new ethers.Contract(erc20TokenAddress, erc20TokenAbi, signer);

            // Specify the amount of tokens to be transferred as payment
            const tokenAmount = ethers.utils.parseUnits(data.price, 'ether');

            // Approve the ERC20PaymentContract to spend the tokens
            updateMessage("Approving token transfer... Please wait.");
            await (await erc20Contract.approve(nftMarketplaceERC20Payment.address, tokenAmount)).wait();

            // Interact with the ERC20 Payment Contract
            let paymentContract = new ethers.Contract(nftMarketplaceERC20Payment.address, nftMarketplaceERC20Payment.abi, signer);
            updateMessage("Buying the NFT with ERC20 tokens... Please Wait (Upto 5 mins)");

            let transaction = await paymentContract.buyNFT(tokenId, tokenAmount);
            await transaction.wait();
            await getNFTData(tokenId);
            alert('You successfully bought the NFT with ERC20 tokens!');
            updateMessage("");
        } catch (e) {
            alert("Transaction Error: " + e);
        }
    }

    const params = useParams();
    const tokenId = params.tokenId;
    if (!dataFetched)
        getNFTData(tokenId);
    if (typeof data.image == "string")
        data.image = GetIpfsUrlFromPinata(data.image);

   

    useEffect(() => {
        if (!dataFetched) {
            getNFTData(tokenId);
        }
    }, [tokenId, dataFetched]);

    return (
        <div style={{ "min-height": "100vh" }}>
            <Navbar></Navbar>
            <div className="flex ml-20 mt-20">
                <img src={data.image} alt="" className="w-2/5" />
                <div className="text-xl ml-20 space-y-8 text-white shadow-2xl rounded-lg border-2 p-5">
                    <div>
                        Name: {data.name}
                    </div>
                    <div>
                        Description: {data.description}
                    </div>
                    <div>
                        Price: <span className="">{data.price + " ETH/ERC20 Token"}</span>
                    </div>
                    <div>
                        Owner: <span className="text-sm">{data.owner}</span>
                    </div>
                    <div>
                        Seller: <span className="text-sm">{data.seller}</span>
                    </div>
                    <div>
                        {!isOwner && currAddress !== data.owner && currAddress !== data.seller ?
                            <div>
                                <select className="payment-method-selector bg-white-500 text-black font-bold py-2 px-4 rounded text-sm" style={{ marginRight: '8px' }} onChange={(e) => setPaymentMethod(e.target.value)}>
                                    <option value="ETH">Pay with ETH</option>
                                    <option value="ERC20">Pay with ERC20 Token</option>
                                </select>
                                {paymentMethod === 'ETH' ?
                                    <button className="enableEthereumButton bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" style={{ marginTop: '8px' }} onClick={() => buyNFT(tokenId)}>Buy this NFT with ETH</button> :
                                    <button className="enableEthereumButton bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm" style={{ marginTop: '8px' }} onClick={() => buyNFTWithERC20(tokenId)}>Buy this NFT with ERC20</button>
                                }
                            </div> :
                            <div className="text-emerald-700">You are the owner of this NFT</div>
                        }
                        <div className="text-green text-center mt-3">{message}</div>
                    </div>

                </div>
            </div>
        </div>
    )
}