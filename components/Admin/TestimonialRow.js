import React from "react";
import { useRouter } from "next/router";

const TestimonialRow = ({
	id,
	image_url,
	name,
	designation,
	description,
	onDelete,
}) => {
	const router = useRouter();
	return (
		<tr>
			<td>
				<img
					src={image_url}
					alt="image"
					className="w-40px rounded-circle"
				/>
			</td>
			<td>{name}</td>
			<td>{designation}</td>
			<td>
				<div className="max-300px max-height-60">{description}</div>
			</td>
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
					onClick={() => router.push(`/admin/testimonials/${id}`)}
				>
					Update
				</button>
			</td>
		</tr>
	);
};

export default TestimonialRow;
