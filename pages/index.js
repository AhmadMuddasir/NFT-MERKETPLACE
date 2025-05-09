import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

import {
  Card,
  Upload,
  Button,
  Profile,
  Header,
  Footer,
  Notification,
  Logo,
  Filter,
  Form,
} from "../Components";
import { useStateContext } from "../Context/NFTs";
import images from "../Components/Image/client/index";

const Index = () => {
  const {
    address,
    disconnect,
    contract,
    connect,
    userBalance, // Fixed typo: userBlance -> userBalance
    uploadImage,
    getUploadedImages,
    setLoading,
    loading,
    getAllNFTsAPI,
  } = useStateContext();

  const [openProfile, setOpenProfile] = useState(false);
  const [closeForm, setCloseForm] = useState(true);
  const [file, setFile] = useState(null);
  const [display, setDisplay] = useState(null);
  const [notification, setNotification] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [activeSelect, setActiveSelect] = useState("Old Images");
  const [imagesCopy, setImagesCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [imageInfo, setImageInfo] = useState({
    title: "",
    description: "",
    email: "",
    category: "",
    image: "",
  });

  // Initialize oldImages as a state to avoid mutating it in render
  const [oldImages, setOldImages] = useState([]);

  // Fetch images only when necessary
  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const images = await getUploadedImages();
      const newImages = Array.isArray(images) ? images : [];
      setAllImages(newImages);
      setImagesCopy(newImages); // Initialize imagesCopy
      setOldImages(newImages); // Initialize oldImages as a copy

      // Fetch API NFTs
      const apiImages = await getAllNFTsAPI();
      // Note: You may want to merge apiImages with newImages if needed
    } catch (error) {
      console.error("Error fetching images:", error);
      setNotification("Failed to load images");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch images only when contract and address are stable
  useEffect(() => {
    if (contract && address) {
      fetchImages();
    }
  }, [contract, address]);

  // Handle form field changes
  const handleFormFieldChange = (fieldName, e) => {
    setImageInfo({ ...imageInfo, [fieldName]: e.target.value });
  };

  // Handle form submission for uploading to Pinata and blockchain
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setNotification("Please select a file");
      return;
    }

    setCloseForm(false);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `9dabd29224fd341f9e3c`,
          pinata_secret_api_key: `2d0bf04f3f762ec42fbeaee49290ddad47c636506494ee6a9073accb452b3ef3`,
          "Content-Type": "multipart/form-data",
        },
      });

      const image = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

      await uploadImage({
        ...imageInfo,
        image,
        category,
      });

      setNotification("Image uploaded successfully");
      setFile(null);
      setDisplay(null);
      setImageInfo({
        title: "",
        description: "",
        email: "",
        category: "",
        image: "",
      });
      setCategory("");
      fetchImages(); // Refresh images after upload
    } catch (error) {
      console.error("Error uploading image:", error);
      setNotification("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection
  const retrieveFile = (e) => {
    const data = e.target.files[0];
    if (data) {
      setFile(data);
    }
    e.preventDefault();
  };

  // Handle image preview
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setDisplay(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="home">
      <Header notification={notification} setNotification={setNotification} />
      <div className="header">
        <h1>Create 1000 NFTs for free</h1>
      </div>
      <div className="upload">
        <Upload
          onImageChange={onImageChange}
          display={display}
          address={address}
          retrieveFile={retrieveFile}
        />
        <div className="upload-info">
          <h1>Welcome to NFTs IPFS Upload</h1>
          <p>
            Our products help you securely distribute any type of media at
            scale-freeing you from restrictive platforms, middlemen, and
            algorithms that limit your creative agency
          </p>
          <div className="avatar">
            <Button
              address={address}
              disconnect={disconnect}
              connect={connect}
              file={file}
            />
            {address && (
              <p>
                <Image
                  className="avatar_img"
                  src={images.client1}
                  width={40}
                  height={40}
                  onClick={() => setOpenProfile(true)}
                  alt="img"
                />
              </p>
            )}
          </div>
        </div>
      </div>
      <h1 className="subheading">All NFTs of Marketplace</h1>
      {isLoading ? (
        <Logo />
      ) : allImages.length === 0 ? (
        <h1>No Images</h1>
      ) : (
        <>
          <Filter
            setImagesCopy={setImagesCopy}
            imagesCopy={imagesCopy}
            setAllImages={setAllImages}
            allImages={allImages}
            oldImages={oldImages}
            activeSelect={activeSelect}
            setActiveSelect={setActiveSelect}
          />
          <div className="card">
            {allImages.map((image, i) => (
              <Card
                key={i} // Use index as key (consider using image.id if available)
                index={i}
                image={image}
                setNotification={setNotification}
              />
            ))}
          </div>
        </>
      )}
      <Footer />
      {notification && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}
      {openProfile && (
        <div className="profile">
          <Profile
            setOpenProfile={setOpenProfile}
            userBalance={userBalance} // Fixed typo: userBlance -> userBalance
            address={address}
          />
        </div>
      )}
      {loading && (
        <div className="loader">
          <Logo />
        </div>
      )}
      {file && closeForm && (
        <div className="form2">
          <div className="form_inner">
            <Form
              setFile={setFile}
              setDisplay={setDisplay}
              handleFormFieldChange={handleFormFieldChange}
              handleSubmit={handleSubmit}
              setCategory={setCategory}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;