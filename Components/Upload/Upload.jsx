import React from "react";
import Image from "next/image";

import { Delete,UploadIcon,File } from "../SVG/index";
import style from "./Upload.module.css";


const Upload = ({onImageChange,display,retrieveFile}) => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        {
          display == null ? (
            <>
            <UploadIcon/>
            <p>Browse File to Upload</p>
            </>
          ):(
            <p>
              <Image
              className={style.image}
              src={display}
              alt="image"
              width={200}
              height={200}
              />
            </p>
          )
        }
      </div>
      <label
      htmlFor="file"
      className={style.footer}
      >
        <File/>
        <p>Select file</p>
        <Delete/>
      </label>
      <input 
      id="file"
      onChange={(e)=>(onImageChange(e),retrieveFile(e))}
      className={style.file}
      type="file"
       />
    </div>
  )
};

export default Upload;
