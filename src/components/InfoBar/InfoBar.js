import React from "react";
import { client } from "../../config.json";
import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";
import "./InfoBar.css";

const InfoBar = ({ room, chatList = false }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    {!chatList ? <div className="rightInnerContainer"></div> : <> </>}
  </div>
);

export default InfoBar;
