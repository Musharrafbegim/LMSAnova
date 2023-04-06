import React from "react";
import Link from "next/link";

const CourseRow = ({
	id,
	title,
	slug,
	latest_price,
	category,
	user,
	videos,
	approved,
	in_home_page,
	onApprove = null,
	onDeny = null,
	onHome = null,
	onHomeRemove = null,
}) => {
	return (
		<tr>
			<td>
				<Link href={`/course/${slug}`}>
					<a>{title}</a>
				</Link>
			</td>
			<td>${latest_price}</td>
			<td>{category.name}</td>
			<td>{user.first_name}</td>
			<td>{videos.length}</td>
			{onHome && (
				<td>
					{in_home_page ? (
						<button
							type="button"
							className="btn btn-danger btn-sm fs-12 ms-2"
							onClick={() => onHomeRemove(id)}
						>
							Remove
						</button>
					) : (
						<button
							type="button"
							className="btn btn-primary btn-sm fs-12 ms-2"
							onClick={() => onHome(id)}
						>
							Homepage
						</button>
					)}
				</td>
			)}
			<td>
				{approved ? (
					<button
						type="button"
						className="btn btn-success btn-sm fs-12 ms-2"
					>
						Approved
					</button>
				) : (
					<button
						type="button"
						className="btn btn-warning btn-sm fs-12"
					>
						Pending
					</button>
				)}
			</td>
			{!approved && (
				<td>
					<button
						type="button"
						className="btn btn-success btn-sm fs-12 ms-2"
						onClick={() => onApprove(id)}
					>
						Approve Now
					</button>

					<button
						type="button"
						className="btn btn-danger btn-sm fs-12 ms-2"
						onClick={() => onDeny(id)}
					>
						Delete
					</button>
				</td>
			)}
		</tr>
	);
};

export default CourseRow;
