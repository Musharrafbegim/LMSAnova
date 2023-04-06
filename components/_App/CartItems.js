import React from "react";
import Link from "@/utils/ActiveLink";

const CartItems = ({
	id,
	title,
	slug,
	price,
	regular_price,
	image,
	instructor,
}) => {
	return (
		<li>
			<Link href={`/course/${slug}`}>
				<a className="dropdown-item">
					<div className="d-flex align-items-center">
						<div>
							<img
								src={image}
								alt={title}
								style={{
									width: "150px",
								}}
							/>
						</div>
						<div className="ps-3">
							<h6 className="fw-bold fs-14 mb-1">
								{title.slice(0, 40)}...
							</h6>
							<p className="fs-13 mb-2">By: {instructor}</p>
							<div className="price fs-13">
								<strong>${price}</strong>{" "}
								<del className="fs-12 text-muted ms-1">
									${regular_price}
								</del>
							</div>
						</div>
					</div>
				</a>
			</Link>
		</li>
	);
};

export default CartItems;
