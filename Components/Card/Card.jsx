import React from "react";
import Image from "next/image";
import Link from "next/link";

import style from "./Card.module.css";
import images from "../Image/client/index";
import NFTimages from "../Image/index"

const Card = ({ setNotification, image, index }) => {
  const date = new Date(image.createdAt * 1000).toString();
  // getting from getUploadedImages
  return (
    <div className={style.card}>
      <div className={style.content}>
        <a href={`/image/${image.imageId}`}>
          <p>
            {/* <img */}
            <img
              className={style.image}
              src={image.image}
              alt="image"
              // width={250}
              // height={200}
            />
          </p>
        </a>
        <span className={style.para}>
          <Image
            className="avatar_img"
            src={images[`client${index + 1}`]}
            width={40}
            height={40}
            alt="img"
          />
          <small
            className={style.para_small}
            onClick={() => {
              setNotification("successfully copied")
              navigator.clipboard.writeText(image.owner);
              // navigator.clipboard.writeText("successfully copied");
            }}
          >
            {image.owner.slice(0,25)}...
            COPY address
          </small>
        </span>
        <span>
          CreatedAt: {date.slice(0,15)}
          {/* jun 15 2025 */}
          <small className={style.number}>
            
            #{image.imageId}
          </small>
        </span>
        <small className={style.para}>
          {image.description.slice(0, 80)}...
        </small>
        <button
        className={style.cardButton}
          onClick={() => {
            setNotification("image URL successfully copied")
              navigator.clipboard.writeText(image.image);
              // navigator.clipboard.writeText("image URL successfully copied");
          }}
        >
          Copy URL
        </button>
      </div>
    </div>
  );
};

export default Card;
