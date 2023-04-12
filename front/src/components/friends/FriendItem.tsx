import React from "react";
import "./FriendItem.scss";

interface Props {
	image: string;
	name: string;
	id: number;
	onRemove: (id: number) => void;
}

export default function FriendItem({ image, name, id, onRemove }: Props) {
	return (
		<div className="friendItem">
			<div className="image">
				<img src={image} alt="zdjęcie znajomego" />
			</div>
			<div className="personal">{name}</div>
			<div className="controls">
				<button className="edit">EDYTUJ</button>
				<button className="delete" onClick={() => onRemove(id)}>
					USUŃ
				</button>
			</div>
		</div>
	);
}
