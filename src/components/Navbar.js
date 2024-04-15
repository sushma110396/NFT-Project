import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';

function Navbar() {
    const [connected, setConnected] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [currAddress, setCurrAddress] = useState('0x');

    async function checkIfWalletIsConnected() {
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                console.log('Accounts found:', accounts);
                if (accounts.length > 0) {
                    setConnected(true);
                    setCurrAddress(accounts[0]);
                } else {
                    setConnected(false);
                    setCurrAddress('0x');
                }
            } else {
                console.log("Ethereum object not available.");
            }
        } catch (error) {
            console.error("Failed to check wallet connection:", error);
        }
    }

    async function connectWebsite() {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('After request:', accounts);
            if (accounts.length > 0) {
                setConnected(true);
                setCurrAddress(accounts[0]);
            } else {
                setConnected(false);
            }
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        const handleAccountsChanged = (accounts) => {
            console.log('Accounts changed:', accounts);
            if (accounts.length > 0) {
                setConnected(true);
                setCurrAddress(accounts[0]);
            } else {
                setConnected(false);
                setCurrAddress('0x');
            }
        };

        window.ethereum?.on('accountsChanged', handleAccountsChanged);

        return () => {
            window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
        };
    }, []);

    return (
        <div className="">
            <nav className="w-screen">
                <ul className='flex items-end justify-between py-3 bg-transparent text-white pr-5'>
                    <li className='flex items-end ml-5 pb-2'>
                        <Link to="/">
                            <div className='inline-block font-bold text-xl ml-2'>NFT Marketplace</div>
                        </Link>
                    </li>
                    <li className='w-2/6'>
                        <ul className='lg:flex justify-between font-bold mr-10 text-lg'>
                            <li className={(location.pathname === "/" ? 'border-b-2 ' : 'hover:border-b-2 ') + 'hover:pb-0 p-2'}>
                                <Link to="/">Marketplace</Link>
                            </li>
                            <li className={(location.pathname === "/sellNFT" ? 'border-b-2 ' : 'hover:border-b-2 ') + 'hover:pb-0 p-2'}>
                                <Link to="/sellNFT">List My NFT</Link>
                            </li>
                            <li className={(location.pathname === "/profile" ? 'border-b-2 ' : 'hover:border-b-2 ') + 'hover:pb-0 p-2'}>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={connectWebsite}>
                                    {connected ? "Connected" : "Connect Wallet"}
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div className='text-white text-bold text-right mr-10 text-sm'>
                {currAddress !== "0x" ? `Connected to ${currAddress.substring(0, 15)}...` : "Not Connected. Please login to view NFTs"}
            </div>
        </div>
    );
}

export default Navbar;
