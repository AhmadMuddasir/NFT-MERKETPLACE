import React,{useState} from "react";
import {Header,Footer,Notification,Logo} from "../Components/index";
import { useStateContext } from "../Context/NFTs";

const nftsapi = () => {
  const {loading} = useStateContext();
  const [notification,setNotification] = useState("");
  
  const apiEndPoints = [
    {
      title:"Get ALL NFTs",
      description:"Welcome to NFTs Api,access to all the nfts upoaded to IPFS by following the mention steps below",
      method:"GET",
      endpoint:"http://localhost:3000/api/v1/NFTs",
    },{
      title:"GET Single NFts",
      description:"Single NFTs API get Access to single nft uploaded to IPfs by following the mention steps below",
      method:"GET",
      endpoint:"http://localhost:3000/api/v1/NFTs/Id",
    },
    {
      title:"crate Image Upload",
      description:"This endpoint allow you to make post request on the server to upload the Image",
      method:"POST",
      endpoint:"http://localhost:3000/api/v1/NFTs",
    },
    {
      title:"Login EndPoint",
      description:"Allow user to use nfts API authentication to log user in ",
      method:"POST",
      endpoint:"http://localhost:3000/api/v1/user/login",
    },
    {
      title:"SignUP EndPoint",
      description:"Allow user to use nfts API for creating account,to signUp  user",
      method:"POST",
      endpoint:"http://localhost:3000/api/v1/user/signup",
    },
  ];
  return (
    <div className="home">
      <Header
      notification={setNotification}
      setNotification={setNotification}
      />
      <div className="header">
        <h1>How to Use NFTs API</h1>
      </div>
      <div className="api-body">
        {apiEndPoints.map((items,i)=>(
          <div className="api-left">
            <h3 className="api-title">{items.title}</h3>
            <p>{items.description}</p>
            <p>method:{items.method}</p>
            <p>EndPoint{items.endpoint}</p>
          </div>
        ))}
      </div>
      <Footer></Footer>
      {/* Notification */}
        {notification != "" && (
          <Notification
          notification={notification}
          setNotification={setNotification}
          />
        )}

        {loading && (
          <div className="loader">
            <Logo/>
          </div>
        )}
    </div>
  )
};

export default nftsapi;
