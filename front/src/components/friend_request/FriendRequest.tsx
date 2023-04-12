import React from 'react';
import './FriendRequest.scss';

interface FriendRequestProps {
  friends: {
    username: string;
    avatarUrl: string;
  }[];
  onAccept: (username: string) => void;
  onReject: (username: string) => void;
  onClose: () => void;
}

const FriendRequest: React.FC<FriendRequestProps> = ({
  friends,
  onAccept,
  onReject,
  onClose,
}) => {

  return (
    <div className="friendRequestContainer bg-dark text-white">
      <div className="friendRequestContainer__close" onClick={onClose}>
        <div>
          +
        </div>
      </div>
        <div className="friendRequestContainer__title">
          <p>Masz nowe zaproszenia do znajomych:</p>
        </div>
        {friends.map((friend) => (
          <div key={friend.username} className="friendRequestContainer__item" >
            <img className="friendRequestContainer__item__avatar"
              src={friend.avatarUrl}
              alt={`Zdjęcie użytkownika ${friend.username}`}
            />
            <p className="friendRequestContainer__item__username">{friend.username}</p>
            <div className="friendRequestContainer__item__buttons">
              <button
                className="friendRequestContainer__item__buttons--accept"
                onClick={() => onAccept(friend.username)}
              >
                Akceptuj
              </button>
              <button
                className="friendRequestContainer__item__buttons--reject"
                onClick={() => onReject(friend.username)}
              >
                Odrzuć
              </button>
            </div>
          </div>
        ))}
      </div>
  );
};

export default FriendRequest;