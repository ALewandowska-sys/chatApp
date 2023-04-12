import React, { useState } from "react";
import { Link } from "react-router-dom";
import FriendRequest from "../../friend_request/FriendRequest";
import Login from "../../login_form/Login";
import "./Navbar.scss";




export default function Navbar(): JSX.Element {
  const [showFriendsRequest, setShowFriendsRequest] = useState(false);

  const handleFriendsRequestClick = (): void => {
    setShowFriendsRequest(!showFriendsRequest);
	  console.log("show friends request")
  }

  const handleCloseFriendsRequest = (): void => {
    setShowFriendsRequest(false);
	  console.log("close friends request")
  }

  const isAnyNotification = (): boolean => {
    return showFriendsRequest;
  }

  return (
    <nav>
      <Link className="navbar-logo" to={"/myhome"}>
        Logo
      </Link>

      <Login />

      {/* <button className="navbar-friendsRequest" onClick={handleFriendsRequestClick}>
        <i className="bi bi-bell-fill notificationBell"></i>
        {
          !isAnyNotification() &&
          <div className="notificationDot"></div>
        }
      </button>

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
      )} */}

    </nav>

  );
}
