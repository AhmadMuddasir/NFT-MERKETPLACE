import React from "react";

//internal import
import style from "./Notification.module.css";

const Notification = ({ setNotification, notification }) => {
  return (
    <div className={style.alert} onClick={() => setNotification("")}>
      {notification}
      <span>&times;</span>{" "}
    </div>
  );
};

export default Notification;
