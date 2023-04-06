import React, { useState, useEffect } from "react";
import { Jutsu } from "react-jutsu";

const LiveClassComponent = ({ slug, first_name, last_name }) => {
	const [room, setRoom] = useState(slug);
	const [name, setName] = useState(first_name);
	const [call, setCall] = useState(false);

	const handleClick = (event) => {
		event.preventDefault();
		if (room && name) setCall(true);
	};

	return (
		<div>
			{call ? (
				<Jutsu
					doamin="meet.jit.si"
					roomName={room}
					displayName={name}
					onMeetingEnd={() => console.log("Meeting has ended")}
					loadingComponent={<p> jitsi is loading ...</p>}
					containerStyles={{ width: "100%", height: "600px" }}
				/>
			) : (
				<form className="row row-cols-lg-auto g-3 align-items-center">
					<div className="col-12">
						<input
							id="room"
							type="text"
							placeholder="Room"
							value={room}
							onChange={(e) => setRoom(e.target.value)}
							readOnly={true}
							className="form-control"
						/>
					</div>
					<div className="col-12">
						<input
							id="name"
							type="text"
							placeholder="Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							readOnly={true}
							className="form-control"
						/>
					</div>
					<div className="col-12">
						<button
							onClick={handleClick}
							type="submit"
							className="default-btn"
						>
							<i className="flaticon-user"></i> Start / Join
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default LiveClassComponent;
