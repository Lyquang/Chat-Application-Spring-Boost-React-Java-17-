import React from "react";

import "./Login.css";

export const Login = ({
  roomId,
  setRoomId,
  userName,
  setUserName,
  setLoggedIn,
}) => {
  const checkForLogin = (e) => {
    e.preventDefault();
    if (roomId == "" || userName == "") {
      alert("fill the required fields");
    } else {
      console.log("Logging in at Login.jsx, roomId: ", roomId, " userName: ", userName);
      setLoggedIn(true);
    }
  };

  return (
    <div className="login_root">
      <form className="login_form" onSubmit={checkForLogin}>
        <input
          type="text"
          required
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="Enter UserName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};
