import {
  HashRouter as Router,
  Link,
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

function Navbar() {

const [connected, toggleConnect] = useState(false);
const location = useLocation();
const [currAddress, updateAddress] = useState('0x');

async function getAddress() {
  const ethers = require("ethers");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const addr = await signer.getAddress();
  updateAddress(addr);
}

function updateButton() {
  const ethereumButton = document.querySelector('.enableEthereumButton');
  ethereumButton.textContent = "Connected";
  ethereumButton.classList.remove("hover:bg-blue-70");
  ethereumButton.classList.remove("bg-blue-500");
  ethereumButton.classList.add("hover:bg-green-70");
  ethereumButton.classList.add("bg-green-500");
}

    async function connectWebsite() {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length > 0) {
                updateButton();
                console.log("Connected to:", accounts[0]);
                getAddress(); // Make sure you have defined this function to handle the retrieval and setting of the address
                window.location.replace(location.pathname);
            }
        } catch (error) {
            console.error('Error connecting to MetaMask', error);
        }
    }

    useEffect(() => {
        if (window.ethereum === undefined) return;

        let val = window.ethereum.isConnected();
        if (val) {
            console.log("Already connected.");
            getAddress(); // As before, ensure this is defined to update address state
            toggleConnect(val); // Ensure this function updates the UI based on connection status
            updateButton(); // Adjusts button appearance based on connection status
        }

        const handleAccountsChanged = (accounts) => {
            if (accounts.length === 0) {
                console.log("Please connect to MetaMask.");
            } else {
                console.log("Accounts changed. Connected to:", accounts[0]);
                getAddress(); // Update address on account change
                toggleConnect(true); // Update connection status
                updateButton(); // Adjust button appearance
            }
            // Reload the page to reflect changes
            window.location.replace(location.pathname);
        };

        window.ethereum.on('accountsChanged', handleAccountsChanged);

        // Cleanup listener when component unmounts
        return () => window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    }, [location.pathname]); // Empty dependency array means this effect runs only on mount and unmount



    return (
        <div className="">
        <nav className="w-screen">
          <ul className='flex items-end justify-between py-3 bg-transparent text-white pr-5'>
          <li className='flex items-end ml-5 pb-2'>
            <Link to="/">
            
            <div className='inline-block font-bold text-xl ml-2'>
              NFT Marketplace
            </div>
            </Link>
          </li>
          <li className='w-2/6'>
            <ul className='lg:flex justify-between font-bold mr-10 text-lg'>
              {location.pathname === "/" ? 
              <li className='border-b-2 hover:pb-0 p-2'>
                <Link to="/">Marketplace</Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0 p-2'>
                <Link to="/">Marketplace</Link>
              </li>              
              }
              {location.pathname === "/sellNFT" ? 
              <li className='border-b-2 hover:pb-0 p-2'>
                <Link to="/sellNFT">List My NFT</Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0 p-2'>
                <Link to="/sellNFT">List My NFT</Link>
              </li>              
              }              
              {location.pathname === "/profile" ? 
              <li className='border-b-2 hover:pb-0 p-2'>
                <Link to="/profile">Profile</Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0 p-2'>
                <Link to="/profile">Profile</Link>
              </li>              
              }  
              <li>
                                <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={connectWebsite}>{connected ? "Connected" : "Connect Wallet"}</button>
              </li>
            </ul>
          </li>
          </ul>
        </nav>
        <div className='text-white text-bold text-right mr-10 text-sm'>
          {currAddress !== "0x" ? "Connected to":"Not Connected. Please login to view NFTs"} {currAddress !== "0x" ? (currAddress.substring(0,15)+'...'):""}
                </div>
      </div>
    );
  }

  export default Navbar;