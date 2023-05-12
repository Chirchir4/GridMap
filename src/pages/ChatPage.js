import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  getDataWithoutDocId,
  saveData,
  saveDataWithoutDocId,
} from "../functions/functions";
import { and, or, where } from "firebase/firestore";

export default function ChatPage(props) {
  let { receiverId, chatId } = useParams();
  console.log("This is the receive id", receiverId);
  const [chats, setChats] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [textMessage, setTextMessage] = useState();
  const getAllUsers = () => {
    getDataWithoutDocId("users").then((result) => {
      console.log("This is the result", result);
      const allUsers = [];
      result.forEach((doc) => {
        const { email, lastMessage } = doc.data();
        allUsers.push({
          id: doc.id,
          name: email,
          lastMessage: lastMessage || "Start Conversation!",
        });
      });
      setChats(allUsers);
    });
  };

  const getChatForReceiverId = () => {
    getDataWithoutDocId(
      "chats",
      or(
        where("chatId", "==",  localStorage.getItem("uid")+receiverId),
        where("chatId", "==",  receiverId+localStorage.getItem("uid")),
      )
    ).then((result) => {
      const allUsers = [];
      result.forEach((doc) => {
        const data = doc.data();
        console.log("This is the result of chats", data);
        if (chatId) {
          console.log("chatID",chatId)
          if(doc.id.includes(chatId))
          {
              setChatMessages(data.chatMessages);
          }
        } else {
            window.location.href = window.location.href =
              "/chat/" + receiverId + "/" + doc.id;
        }
      });
      console.log("Thse is the all users", allUsers);
      // setChats(allUsers);
    });
  };
  useEffect(() => {
    getAllUsers();
    if (receiverId) {
      getChatForReceiverId();
    }
  }, []);
console.log("cccccccccccccccccccccccccccccchatssssssssssssssssss",chats)
  const sendMessage = () => {
    if (textMessage === "") {
      alert("Cannot send Empty Message");
      return;
    }
    var tempMessages = chatMessages;
  //   const frozenChatMessages = Object.freeze(chatMessages);
  // var tempMessages = [...frozenChatMessages];

    console.log("temp messges",tempMessages)
    tempMessages.push({
      receiverId: receiverId,
      senderId: localStorage.getItem("uid"),
      message: textMessage,
    });
    if (chatId) {
      saveData("chats", chatId, {
        chatMessages: tempMessages,
        chatUser1: receiverId,
        chatUser2: localStorage.getItem("uid"),
      }).then(() => {
        window.location.reload();
      });
    } else {
      saveDataWithoutDocId("chats", {
        chatMessages: tempMessages,
        chatId: localStorage.getItem("uid")+receiverId,
      }).then((res) => {
        console.log("This is the res", res._key.path.segments[1]);
        window.location.href =
          "/chat/" + receiverId + "/" + res._key.path.segments[1];
      });
    }
  };

  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid item md={4}>
        <div
          style={{
            height: "100vh",
            maxHeight: "100vh",
            overflow: "scroll",
            borderRight: "1px solid gray",
          }}
        >
          {chats.map((chat) => {
            return (
              <div
                style={{
                  borderBottom: "1px solid red",
                  height: 70,
                  width: "100%",
                  paddingInline: 20,
                }}
                onClick={() => {
                  window.location.href = "/chat/" + chat.id;
                }}
              >
                <p style={{ margin: 0, fontSize: 20, fontWeight: "bold" }}>
                  {chat.name}
                </p>
                <span>{chat.lastMessage}</span>
              </div>
            );
          })}
        </div>
      </Grid>
      <Grid item md={8}>
        <Grid container direction={"column"}>
          <div style={{ height: "90vh", width: "100%" }}>
            {chatMessages.map((chat) => {
              return (
                <Grid container direction="row" justifyContent={
                  chat.senderId.includes(localStorage.getItem("uid"))?"flex-end":"flex-start"
                  }>
                  <div
                    style={{
                      background: "#8a2be2",
                      width: "40%",
                      color: "white",
                      padding: 5,
                      borderRadius: 8,
                      margin:10
                    }}
                  >
                    {chat.message}
                  </div>
                </Grid>
              );
            })}
          </div>
          <div
            style={{
              height: "9vh",
              width: "100%",
              borderTop: "1px solid gray",
            }}
          >
            <input
              style={{ borderRadius: 4 }}
              value={textMessage}
              onChange={(e) => {
                setTextMessage(e.target.value);
              }}
              placeholder="Type your message here!"
            ></input>
            <button
              className="button-active"
              onClick={() => {
                sendMessage();
              }}
            >
              Send
            </button>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
