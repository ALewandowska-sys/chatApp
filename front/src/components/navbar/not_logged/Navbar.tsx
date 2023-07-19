import React, { useState } from "react";
import { Link } from "react-router-dom";
import FriendRequest from "../../friend_request/FriendRequest";
import Login from "../../login_form/Login";
import "./Navbar.scss";
import ThemeSwitcher from "../../theme_switcher/ThemeSwitcher";




export default function Navbar(): JSX.Element {
  const [showFriendsRequest, setShowFriendsRequest] = useState(false);

  const handleCloseFriendsRequest = (): void => {
    setShowFriendsRequest(false);
	  console.log("close friends request")
  }

  return (
    <nav>
      <Link className="navbar-logo" to={"/myhome"}>
        Logo
      </Link>

      <Login />

      {showFriendsRequest && (
        <FriendRequest
          friends={[
			{ username: "Jan", avatarUrl: "https://i.pravatar.cc/150?img=3" },
			{ username: "Anna", avatarUrl: "https://i.pravatar.cc/150?img=3" },
			{ username: "Michał", avatarUrl: "https://i.pravatar.cc/150?img=3" },
		  ]}
          onAccept={(username) => {console.log(`added ${username}`)}}
          onReject={(username) => {console.log(`rejected ${username}`)}}
          onClose={handleCloseFriendsRequest}
        />
      )}
    <ThemeSwitcher/>
    </nav>

  );
}
