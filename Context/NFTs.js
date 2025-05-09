import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { ethers } from "ethers";

// Assuming you have the ABI from your Hardhat compilation
import contractABI from "../contractABI/nftsIPFS.json"; // Update with actual path

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // const contractAddress = "0x115EAadF139E54345D9FCde10B04c98437F9415b";
  const contractAddress = "0xeB5a14622E63226EB7dDd0c29C2119b0D4893cde";
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState(null);
  const [userBlance, setUserBalance] = useState();
  const [loading, setLoading] = useState(false);

  // Initialize ethers provider and contract
  const initializeEthers = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

        setProvider(provider);
        setSigner(signer);
        setContract(contract);

        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        }

const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          setAddress(null);
          setUserBalance(null);
        } else if (accounts[0] !== address) {
          setAddress(accounts[0]);
          // fetchData(); // Fetch balance for the new account
        }
      };
      // Set up event listeners
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());

      } else {
        console.error("MetaMask not detected");
      }
    } catch (error) {
      console.error("Error initializing ethers:", error);
    }
  };

  // Connect wallet
  const connect = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        await initializeEthers();
      } else {
        console.error("MetaMask not installed");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Disconnect wallet
  const disconnect = () => {
    setAddress(null);
    setSigner(null);
    setContract(null);
    setProvider(null);
    setUserBalance(null);
  };

  // Fetch user balance
  const fetchData = async () => {
    try {
      if (signer && address) {
        const balance = await signer.getBalance();
        const formattedBalance = ethers.utils.formatEther(balance);
        setUserBalance(formattedBalance);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
//___________________________________________________


useEffect(() => {
  initializeEthers();
}, []);

  useEffect(()=>{
    if(address && signer){

      fetchData();
    }
  },[address,signer])

  // Contract functions

  const uploadImage = async (ImageInfo) => {
    const { title, description, email, category, image } = ImageInfo;
    try {
      console.log("1 line 105 NFTs")
      setLoading(true);
      const listingPrice = await contract.listingPrice();
      const tx = await contract.uploadIPFS(
        address,
        image,
        title,
        description,
        email,
        category,
        {
          value: listingPrice,
        }
      );
      console.log("2 line 120")

      await tx.wait();

      // Store data in the API
      console.log("3 line 124");

      const response = await axios({
        method: "POST",
        url: "/api/v1/NFTs",
        data: {
          title,
          description,
          image,
          address,
          email,
        },
      });
      console.log(response);
      console.info("Contract call successful", tx);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error("Error uploading NFT:", error);
      setLoading(false);
    }
  };

  // Get contract data
  const getUploadedImages = async () => {
    try {
      // All images
      const images = await contract.getAllNFTs();
      // Total upload
      const totalUpload = await contract.imagesCount();
      // Listing price
      const listingPrice = await contract.listingPrice();

      const allImages = images.map((image, i) => ({
        owner: image.creator,
        title: image.title,
        description: image.description,
        email: image.email,
        category: image.category,
        fundraised: image.fundraised,
        image: image.image,
        imageId: image.id.toNumber(),
        createdAt: image.timestamp.toNumber(),
        listedAmount: ethers.utils.formatEther(listingPrice.toString()),
        totalUpload: totalUpload.toNumber(),
      }));
      return allImages;
    } catch (error) {
      console.error("Error fetching uploaded images:", error);
    }
  };

  // Get single image
  const singleImage = async (id) => {
    try {
      const data = await contract.getImage(id);
      const image = {
        title: data[0],
        description: data[1],
        email: data[2],
        category: data[3],
        fundraised: ethers.utils.formatEther(data[4].toString()),
        creator: data[5],
        imageURL: data[6],
        createdAt: data[7].toNumber(),
        imageId: data[8].toNumber(),
      };
      return image;
    } catch (error) {
      console.error("Error fetching single image:", error);
    }
  };

  // Donate
  const donateFund = async ({ amount, id }) => {
    try {
      const tx = await contract.donateToImage(id, {
        value: ethers.utils.parseEther(amount.toString()),
      });
      await tx.wait();
      console.log("Donation successful:", tx);
      window.location.reload();
    } catch (error) {
      console.error("Error donating:", error);
    }
  };

  // Get API data
  const getAllNFTsAPI = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "/api/v1/NFTs",
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching all NFTs from API:", error);
    }
  };

  const getSingleNftsAPI = async (id) => {
    try {
      const response = await axios({
        method: "GET",
        url: `/api/v1/NFTs/${id}`,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching single NFT from API:", error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        disconnect,
        userBlance,
        setLoading,
        loading,
        uploadImage,
        getUploadedImages,
        donateFund,
        singleImage,
        getAllNFTsAPI,
        getSingleNftsAPI,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);