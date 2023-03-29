import React from 'react';
import './UserProfile.scss';

interface User {
  login: string;
  city: string;
  age: number;
  avatarUrl: string;
  lastLogin: Date;
  firstLogin: Date;
}

interface Props {
  user: User;
}

const UserProfile: React.FC<Props> = ({ user }) => {
  return (
    <div className="userProfile">
      <img className="userProfile__avatar" src={user.avatarUrl} alt={user.login} />
      <div className='userProfile__info'>
        <h2 className="userProfile__info--login">{user.login}</h2>
        <ul className="userProfile__info--list">
          <li>
            <p>Miasto: {user.city}</p>
          </li>
          <li>
            <p>Wiek: {user.age}</p>
          </li>
          <li>
            <p>Ostatnie logowanie: {user.lastLogin.toLocaleString()}</p>
          </li>
          <li>
            <p>Pierwsze logowanie: {user.firstLogin.toLocaleString()}</p>
          </li>
        </ul>
        <div className='userProfile__buttons'>
          <button className="userProfile__buttons--addFriend">Dodaj znajomego</button>
          <button className="userProfile__buttons--viewFriendsList">Wyświetl znajomych</button>
        </div>
      </div>

    </div>
  );
};

export default UserProfile;
