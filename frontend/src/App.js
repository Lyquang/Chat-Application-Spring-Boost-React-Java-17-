import logo from "./logo.svg";
import "./App.css";
import { Login } from "./components/Login/Login";
import { useState } from "react";
import { Message } from "./components/Message/Message";

function App() {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {!isLoggedIn ? (
        <Login
          userName={userName}
          setUserName={setUserName}
          roomId={roomId}
          setRoomId={setRoomId}
          setLoggedIn={setLoggedIn}
        />
      ) : (
        <Message roomId={roomId} userName={userName} />
      )}
    </div>
  );
}

export default App;
