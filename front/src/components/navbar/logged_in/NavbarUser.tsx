import { Link } from "react-router-dom";
import Logout from "../../logout/Logout";
import "./NavbarUser.scss";
import FriendRequest from "../../friend_request/FriendRequest";
import { useState } from "react";

export default function NavbarUser() {

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
		<nav className="navbarUser">
			<Link className="navbarUser--logo" to={"/myhome"}>
				<img
					src="../../../assets/connections-g7cb911d89_1280.png"
					alt="Epuls site logo"
					className="navbarUser--logo"
				/>
			</Link>
			<div className="navbarUser--buttonsWrapper">
      <button className="navbarUser--buttonsWrapper--friendsRequest" onClick={handleFriendsRequestClick}>
        <i className="bi bi-bell-fill navbarUser--buttonsWrapper--notificationBell"></i>
        {
          !isAnyNotification() &&
          <div className="navbarUser--buttonsWrapper--notificationDot"></div>
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
      )}
			<Logout />
			</div>
		</nav>
	);
}
