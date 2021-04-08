import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { client } from "../../config.json";
import InfoBar from "../InfoBar/InfoBar";
import Loader from "../Loader/Loader";
import "./ChatList.css";
import onlineIcon from "../../icons/onlineIcon.png";

const URL = "http://192.168.5.92:88/v1/get_chats_meta";
const imgStyles = { height: "1vh", marginTop: "2vh", opacity: "75%" };
const flex = { display: "flex" };
const noDecor = { textDecoration: "none" };

const ChatListObject = (element) => {
  return (
    <ul className="chatListtextContainer" key={element}>
      <NavLink to={`/chat/${element}/CreditUp/`} style={noDecor}>
        <div style={flex}>
          <img
            className="onlineIcon"
            style={imgStyles}
            src={onlineIcon}
            alt="online icon"
          />
          <p className="textInside">{element}</p>
        </div>
      </NavLink>
    </ul>
  );
};

export const ChatList = () => {
  const chats = useRef();
  const [hasLoaded, setHasLoaded] = useState(false);

  const getChats = async () => {
    setHasLoaded(false);
    let data = await fetch(URL)
      .then(async (r) => await r.json())
      .catch((e) => console.log(e));
    chats.current = await data?.chats_meta;
    setTimeout(() => setHasLoaded(true), 500);
    return await data;
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <>
      <InfoBar room={<h3>Оберіть чат</h3>} chatList={true} />
      <div className="wrapperContainer">
        <button className="updateButton" onClick={getChats}>
          <h3>Update</h3>
        </button>
        {hasLoaded ? (
          chats.current
            ?.filter((el) => el.needsManager === false)
            ?.map((el) => ChatListObject(el.chat_id))
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};
