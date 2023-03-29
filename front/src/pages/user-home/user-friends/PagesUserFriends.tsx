import React, { useState } from "react";
import "./PagesUserFriends.scss";
import { friendsList } from "../../../components/helpers/FriendsList";
import FriendItem from "../../../components/friends/FriendItem";

export default function PagesUserFriends() {
	const [friends, setFriends] = useState(friendsList);

	const removeFriend = (id: number) => {
		const newFriends = friends.filter((friend) => friend.id !== id);
		setFriends(newFriends);
	};

	return (
		<div className="friends">
			<h1 className="friendsH1">Moi znajomi</h1>
			<div className="friendsList">
				<div className="schoolFriends">
					<h2>Szkoła</h2>
					<FriendByGroup
						groupFilter={"Znajomi ze szkoły"}
						onRemove={removeFriend}
						friendsList={friends}
					/>
				</div>
				<div className="beerFriends">
					<h2>Piwo</h2>
					<FriendByGroup
						groupFilter={"Znajomi do piwa"}
						onRemove={removeFriend}
						friendsList={friends}
					/>
				</div>
				<div className="discordFriends">
					<h2>Discord</h2>
					<FriendByGroup
						groupFilter={"Discordowcy"}
						onRemove={removeFriend}
						friendsList={friends}
					/>
				</div>
			</div>
		</div>
	);
}

type Friend = { id: number; name: string; image: string; group: string };

interface FriendByGroupProps {
	groupFilter: string;
	friendsList: Friend[];
	onRemove: (id: number) => void;
}

const FriendByGroup = ({
	groupFilter,
	friendsList,
	onRemove,
}: FriendByGroupProps) => {
	return (
		<div>
			{friendsList
				.filter((friend) => {
					return friend.group === groupFilter;
				})
				.map((friend) => {
					return (
						<FriendItem
							image={friend.image}
							name={friend.name}
							key={friend.id}
							id={friend.id}
							onRemove={onRemove}
						/>
					);
				})}
		</div>
	);
};
