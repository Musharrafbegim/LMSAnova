import React from "react";

const StudentsRaw = ({
	id,
	first_name,
	last_name,
	email,
	phone,
	bio,
	email_confirmed,
	role,
	onAdmin = null,
}) => {
	return (
		<tr>
			<td>{`${first_name} ${last_name}`}</td>
			<td>{email}</td>
			<td>{phone ? phone : "N/A"}</td>
			<td>{email_confirmed ? "Yes" : "No"}</td>
			<td>
				<div className="max-300px max-height-60">
					{bio ? bio : "N/A"}
				</div>
			</td>
			<td>
				<button
					type="button"
					className="btn btn-success btn-sm fs-12 ms-2"
					onClick={() => onAdmin(id)}
				>
					{role == "admin" ? "Remove from admin" : "Make An Admin"}
				</button>
			</td>
		</tr>
	);
};

export default StudentsRaw;
