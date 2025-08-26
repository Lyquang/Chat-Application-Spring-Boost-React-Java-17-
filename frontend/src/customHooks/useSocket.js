import { useCallback, useEffect, useState } from "react";
import * as io from "socket.io-client";
import { SOCKET_BASE_URL } from "../constants/apiConstants";

export const useSocket = (roomId, userName) => {
  const [socket, setSocket] = useState();
  const [socketResponse, setSocketResponse] = useState({
    roomId: "",
    content: "",
    userName: "",
    messageType: "",
    createdDateTime: "",
  });
  const [isConnected, setConnected] = useState(false);
  // const sendData = useCallback(
  //   (payload) => {
  //     socket.emit("send_message", {
  //       roomId: roomId,
  //       content: payload.content,
  //       userName: userName,
  //       messageType: "CLIENT",
  //     });
  //   },
  //   [socket, roomId]
  // );

  const sendData = useCallback(
  (payload) => {
    const message = {
      roomId: roomId,
      content: payload.content,
      userName: userName,
      messageType: "CLIENT",
    };
    console.log(">>> Sending message", message); // 👈 log kiểm tra
    socket.emit("send_message", message);
  },
  [socket, roomId, userName]
);

  useEffect(() => {
    const s = io(SOCKET_BASE_URL, {
      reconnection: false,
      query: `userName=${userName}&roomId=${roomId}`, //"room=" + room+",username="+username,
    });
    setSocket(s);
    s.on("connect", () => setConnected(true));
    s.on("read_message", (res) => {
      console.log("response at useSOcket",res);
      setSocketResponse({
        roomId: res.roomId,
        content: res.content,
        userName: res.userName,
        messageType: res.messageType,
        createdDateTime: res.createdDateTime,
      });
    });
    return () => {
      s.disconnect();
    };
  }, [roomId]);

  return { socketResponse, isConnected, sendData };
};
