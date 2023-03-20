import React from 'react';
import './FriendRequest.scss';

interface FriendRequestProps {
  username: string;
  avatarUrl: string;
  onAccept: () => void;
  onReject: () => void;
}

const FriendRequest: React.FC<FriendRequestProps> = ({
  username,
  avatarUrl,
  onAccept,
  onReject,
}) => {
  return (
    <div className="friend-request-container">
      <div className="friend-request-text">
        <p>Masz nowe zaproszenie do znajomych od użytkownika:</p>
      </div>
      <img
        src={avatarUrl}
        alt={`Zdjęcie użytkownika ${username}`}
        className="friend-request-avatar"
      />
      <p>{`${username}`}</p>
      <div className="friend-request-buttons">
        <button className="friend-request-accept" onClick={onAccept}>
          Akceptuj
        </button>
        <button className="friend-request-reject" onClick={onReject}>
          Odrzuć
        </button>
      </div>
    </div>
  );
};

export default FriendRequest;
