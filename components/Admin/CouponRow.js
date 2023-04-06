import React, { useState } from "react";

const CatRow = ({
	id,
	code,
	discount,
	active_for_full_site,
	onDelete,
	onCheck,
}) => {
	return (
		<tr>
			<td>{code}</td>
			<td>{discount}%</td>
			<td>
				<input
					type="checkbox"
					onClick={() => onCheck(id)}
					value={active_for_full_site}
					checked={active_for_full_site}
					onChange={() => {}}
				/>
			</td>

			<td>
				<button
					onClick={() => onDelete(id)}
					type="button"
					className="btn btn-danger btn-sm fs-12"
				>
					Delete
				</button>
			</td>
		</tr>
	);
};

export default CatRow;
