import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Loader from "../Loader/Loader";
import {
  buttonStyles,
  checker,
  getInput,
  splitter,
  get_ENDPOINT,
} from "./ChatLogic";
import {
  CLIENT,
  HISTORY,
  INTERVAL,
  IP,
  NEW_CHAT_GET,
  PORT,
  PREFIX,
  SEND,
  VERSION,
  fetchHEADERS,
} from "./Constants";
import "./Chat.css";

let state = true;
let handling = -1;
let handled = [];
let ENDPOINT = `${PREFIX}${IP}${PORT}${VERSION}`;
let CHAT;

const Chat = ({ match = undefined }) => {
  // TODO: Compact client verison
  // TODO: Maybe get back sockets (MVP+)

  const [name, setName] = useState("client");
  const [room, setRoom] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [pastButtons, setPastButtons] = useState([]);
  const [branch, setBranch] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const roomId = match?.params?.id;
  const userName = match?.params?.name;

  const chatBranchButton = (el, i) => (
    <button
      type="button"
      class="chooseButton"
      style={buttonStyles(i, branch)}
      value={el}
      key={i}
      onClick={sendMessage}
    >
      {el}
    </button>
  );


  useEffect(() => {
    CHAT = roomId;
    setRoom(roomId);
    if (userName !== undefined) {
      setName(userName);
    }

    if (!room && messages === []) {
      createNewChat();

      setRoom(CHAT);
    }

    setInterval(() => {
      getHistory(CHAT);
      setLoaded(true);
    }, INTERVAL);
  }, []);

  const createNewChat = async () => {
    const r = await fetch(get_ENDPOINT(`${NEW_CHAT_GET}${CLIENT}`))
      .then((r) => r.json())
      .catch((e) => console.log(e));
    setRoom(r.chat_id);
    CHAT = r.chat_id;
  };

  const getHistory = async (chat_id = room) => {
    if (chat_id !== undefined) {
      let hist = await fetch(`${ENDPOINT}${HISTORY}/${chat_id}`, {
        headers: fetchHEADERS,
      })
        .then((r) => r.json())
        .catch((e) => {
          console.log(e);
        });
      let messages = hist?.messages;

      const needs_handling = (tempo, len = 0) => {
        if (tempo.message_type === "Branch" && tempo.message_id === len) {
          setBranch(JSON.parse(tempo.message));
          state = false;
          handling = tempo.message_id;
        }
        return tempo.message_type !== "Branch";
      };
      let message_display_array = messages?.flatMap((temp_message) => {
        return {
          message: splitter(temp_message),
          name: temp_message.owner,
          type: temp_message.message_type,
          id: temp_message.message_id,
          display: true,
          satisfied: needs_handling(temp_message, messages?.length),
        };
      });

      const get_in_hist = (h) => {
        return h === [] || h === undefined
          ? []
          : message_display_array.map((el) => {
              el.display = checker(el);
              return el;
            });
      };

      setMessages(
        messages === [] || messages === undefined
          ? []
          : get_in_hist(hist).map((e) => {
              return {
                message: e.message,
                name: e.name,
                type: e.type,
                id: e.id,
                display: e.display,
              };
            })
      );
    }
  };

  const sendMessage = async (event) => {
    if (event.target.value !== "") {
      event.preventDefault();
      let m = message === "" ? event.target.value : message;

      if (handling !== -1) {
        setBranch([]);
        handled = [...handled, handling];
        state = true;
        handling = -1;
      }

      setMessage("");
      let me = {
        message: m,
        name: name,
        display: true,
      };
      setMessages([...messages, me]);

      if (room === undefined || room === "") {
        await createNewChat();
        setRoom(CHAT);
      }
      setPastButtons([...pastButtons, m]);
      const body = JSON.stringify({
        message: m,
        name: name,
      });
      let sendURL =
        name !== "CreditUp"
          ? `${ENDPOINT}${SEND}/${CHAT}`
          : `${ENDPOINT}/manager_send_message/${CHAT}/`;
      await fetch(sendURL, {
        method: "POST",
        headers: fetchHEADERS,
        body: body,
      })
        .then((r) => r.json())
        .catch((e) => console.log(e));
    }
  };

  const respond = (
    <div
      className={name === "client" ? "outerContainer" : "outerContainerManager"}
    >
      <div className={name === "client" ? "container" : "containerManager"}>
        <InfoBar room={""} />
        {!loaded && name === "CreditUp" ? (
          <Loader />
        ) : messages === [] || messages === undefined ? (
          ""
        ) : (
          <Messages messages={messages} name={name} />
        )}
        {name === "CreditUp" || (handling === -1 && branch !== []) ? (
          getInput(message, setMessage, sendMessage, name === "CreditUp")
        ) : (
          <div className="flex-container" class="buttonCage">
            {branch.map((el, i) => chatBranchButton(el, i))}
          </div>
        )}
      </div>

      {name === "CreditUp" ? (
        <ul style={{ display: "block" }}>
          <li>
            <button
              className="startButton Button"
              onClick={() =>
                fetch(`${ENDPOINT}/manager_chat_start/${CHAT}/`, {
                  method: "POST",
                  headers: fetchHEADERS,
                })
              }
            >
              <h3 className="textInside">Start</h3>
            </button>
          </li>

          <li>
            <button
              className="endButton Button"
              onClick={() =>
                fetch(`${ENDPOINT}/manager_chat_close/${CHAT}/`, {
                  method: "POST",
                  headers: fetchHEADERS,
                })
              }
            >
              <h3 className="textInside">Close</h3>
            </button>
          </li>
          <li>
            <button className="outButton Button">
              <Link to="/chatlist/" style={{ textDecoration: "none" }}>
                <h3 className="textInside">Out</h3>
              </Link>
            </button>
          </li>
        </ul>
      ) : (
        <></>
      )}
    </div>
  );

  return name === "client" ? (
    <div id="outer">
      <div height="20%" className="clientContainer">
        {respond}
      </div>
    </div>
  ) : (
    respond
  );
};
export default Chat;
