import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, Header, Footer, Notification, Logo, Product } from "../../Components";
import { useStateContext } from "../../Context/NFTs";

const ImageDetail = () => {
  const {
    address,
    contract,
    getUploadedImages,
    setLoading,
    donateFund,
    loading,
    singleImage,
  } = useStateContext();

  const router = useRouter();
  const { query } = router;

  const [allImages, setAllImages] = useState([]);
  const [notification, setNotification] = useState("");
  const [support, setSupport] = useState("");
  const [image, setImage] = useState();

  const fetchImages = async () => {
    try {
      console.log("Query image value:", query.image);
      // Change: Check if query.image is defined and valid before parsing
      if (!query.image || isNaN(parseInt(query.image))) {
        console.error("Invalid image ID format:", query.image);
        setNotification("Invalid image ID in URL");
        return;
      }

      const imageId = parseInt(query.image);
      if (imageId <= 0) {
        throw new Error("Image ID must be positive");
      }

      const [oneImage, images] = await Promise.all([
        singleImage(imageId),
        getUploadedImages(),
      ]);

      if (!oneImage) {
        throw new Error("Image not found");
      }

      setAllImages(images || []);
      setImage(oneImage);
    } catch (error) {
      console.error("Error fetching images:", error);
      setNotification(error.message);
    }
  };

  // Change: Add isReady check to wait for router query
  useEffect(() => {
    console.log("Router query:", query);
    console.log("Contract instance:", contract);
    if (router.isReady && contract) {
      fetchImages();
    }
  }, [router.isReady, address, contract, query.image]);

  const donateAmount = async (amount) => {
    try {
      setLoading(true);
      const result = await donateFund({
        amount: amount.toString(),
        id: parseInt(query.image)
      });

      if (result) {
        await fetchImages(); // Refresh data after donation
      }
    } catch (error) {
      console.error("Donation error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <Header notification={notification} setNotification={setNotification} />
      {!image ? (
        <Logo />
      ) : (
        <Product
          setLoading={setLoading}
          donateAmount={donateAmount}
          setNotification={setNotification}
          setSupport={setSupport}
          image={image}
        />
      )}
      <hr />
      <div className="card">
        {allImages.slice(0, 8).map((image, i) => (
          <Card
            key={image.imageId || i}
            index={i}
            image={image}
            setNotification={setNotification}
          />
        ))}
      </div>
      <Footer />
      {notification && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}
      {loading && (
        <div className="loader">
          <Logo />
        </div>
      )}
    </div>
  );
};

export default ImageDetail;