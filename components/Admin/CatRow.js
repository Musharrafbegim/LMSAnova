import React from "react";
import { useRouter } from "next/router";

const CatRow = ({ id, name, onDelete }) => {
	const router = useRouter();
	return (
		<tr>
			<td>{name}</td>
			<td>
				<button
					onClick={() => onDelete(id)}
					type="button"
					className="btn btn-danger btn-sm fs-12"
				>
					Delete
				</button>
				<button
					type="button"
					className="btn btn-success btn-sm fs-12 ms-2"
					onClick={() => router.push(`/admin/categories/${id}`)}
				>
					Edit
				</button>
			</td>
		</tr>
	);
};

export default CatRow;
