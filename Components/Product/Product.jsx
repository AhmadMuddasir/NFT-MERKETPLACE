import React, { useState } from "react";
import Image from "next/image";
import { saveAs } from "file-saver";

//internal import
import style from "./Product.module.css";
import BTNStyle from "../Button/Button.module.css";
import images from "../Image/index";
import client from "../Image/client/index";
import { Donate } from "../index";

const Product = ({
  setNotification,
  setSupport,
  donateAmount,
  setLoading,
  image,
}) => {
  const handleClick = () => {
    let url = `${image?.imageURL}`; //when we click the particular function
    saveAs(url, `${image?.title}`); //it will allow us to download the image
  };

  const [donate, setDonate] = useState(false);

  return (
    <>
      <div className={style.product}>
        <div className={style.image}>
          <img src={image?.imageURL} alt="img" className={style.image_img} />
        </div>
        <div className={style.detail}>
          <div className={style.detail_box}>
            <h1>{image?.title}</h1>
            <p>{image?.description}</p>
            <p className={style.info}>
              <span>Category:{image?.category}</span>
              {""} <span>Image ID:{image?.imageId}</span>
              {""}{" "}
              <span>
                Created At:{new Date(image?.createdAt * 1000).toDateString()};
              </span>
            </p>
            <p className={style.info}>
              <span>
                Donation:{""} {image?.fundRaised} ZKsync Sepolia
              </span>{" "}
            </p>
            <p>Contract Creator:{image?.email}</p>
            <span className={style.para}>
              <Image
                className="avatar_img"
                src={client[`client${1}`]}
                width={40}
                height={40}
                alt="img"
              />
              <small
                className={style.para_small}
                onClick={() => {
                  setNotification("successfully copied");
                  navigator.clipboard.writeText(image?.creator);
                }}
              >
                {image?.creator.slice(0, 30)}..
              </small>
            </span>
          </div>
          <div className={style.button_column}>
          <button
            className={BTNStyle.button}
            onClick={() => (
              setNotification("Image URL successfully copied"),
                navigator.clipboard.writeText(image?.imageURL)
  )}
          >
            <span className={`${BTNStyle.button_content} ${style.btn}`}>
              Copy URL{" "}
            </span>
          </button>
          {/* Download */}
          <span className={style.space}></span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                setNotification("Thanks for downloading")
              );
            }}
            className={BTNStyle.button}
          >
            <span
              onClick={handleClick}
              className={`${BTNStyle.button_content} ${style.btn}`}
            >
              Download Image{" "}
            </span>
          </button>
          {/* Donate */}
          <span className={style.space}></span>
          <button className={BTNStyle.button} onClick={() => setDonate(true)}>
            <span className={`${style.button_content} ${style.btn}`}>Donate</span>
          </button>
        </div>
        </div>
        {donate && (
          <div className="form">
            <div className="form_inner">
              <Donate
              setLoading={setLoading}
              donateAmount={donateAmount}
              setDonate={setDonate}
              setSupport={setSupport}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Product;
