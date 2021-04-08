import React from "react";
import Input from "../Input/Input";
import { IP, PORT, PREFIX, VERSION } from "./Constants";

export const getInput = (M, setM, sendM, isManager = false) => (
  <Input
    message={M}
    setMessage={setM}
    sendMessage={sendM}
    isManager={isManager}
  />
);

export const splitter = (m) =>
  m.message_type !== "Branch" ? m.message.split('"').join("") : m.message;
export const checker = (el) =>
  el.type !== "Branch" && el.type !== "System" && el.type !== "Checker";

export const buttonStyles = (i, branch) => {
  return {
    height: "5vh",
    width: `${100 / branch.length}vw`,
    marginLeft: i === 0 ? "1vw" : "1vw",
    marginRight: i === branch.length - 1 ? "1vw" : "1vw",
  };
};

export const get_ENDPOINT = (postfix = "") =>
  `${PREFIX}${IP}${PORT}${VERSION}${postfix}`;
