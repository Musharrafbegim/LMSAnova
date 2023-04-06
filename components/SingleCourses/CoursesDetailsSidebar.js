import React, { useEffect, useState } from "react";
import StickyBox from "react-sticky-box";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import toast from "react-hot-toast";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import { useRouter } from "next/router";
import SocialShareBtns from "./SocialShareBtns";
import { calculateDiscount } from "@/utils/helper";

const CoursesDetailsSidebar = ({ current_user, course, onCoupon }) => {
	// console.log(course);
	const cartItems = useSelector((state) => state.cart.cartItems);
	const discount = useSelector((state) => state.cart.discount);
	const dispatch = useDispatch();
	const [add, setAdd] = useState(false);
	const [alreadyBuy, setAlreadyBuy] = useState(false);
	const router = useRouter();
	const [apply, setApplyCoupon] = useState(false);
	const [coupon, setCoupon] = useState({ coupon: "" });

	useEffect(() => {
		const courseExist = cartItems.find((cart) => {
			return course.id === cart.id;
		});
		courseExist && setAdd(true);
		if (current_user && course && course.id) {
			const payload = {
				params: { userId: current_user.id, courseId: course.id },
			};
			const url = `${baseUrl}/api/courses/course/exist`;
			axios.get(url, payload).then((result) => {
				setAlreadyBuy(result.data.enroll);
			});
		}
	}, [cartItems, course]);

	const addToCart = (courseCart) => {
		let courseObj = {};
		courseObj["id"] = courseCart.id;
		courseObj["title"] = courseCart.title;
		courseObj["slug"] = courseCart.slug;
		courseObj["price"] = discount > 0 ? discount : courseCart.latest_price;
		courseObj["regular_price"] = courseCart.before_price;
		courseObj["image"] = courseCart.image;
		courseObj["lessons"] = courseCart.lessons;
		courseObj["duration"] = courseCart.duration;
		courseObj["access_time"] = courseCart.access_time;
		courseObj["quantity"] = 1;
		courseObj[
			"instructor"
		] = `${courseCart.user.first_name} ${courseCart.user.last_name}`;
		dispatch({
			type: "ADD_TO_CART",
			data: courseObj,
		});
	};

	const handleCoupon = async (e) => {
		e.preventDefault();
		try {
			const payload = { coupon: coupon };

			const response = await axios.post(
				`${baseUrl}/api/coupons/get-coupon`,
				payload
			);

			// console.log(response.data.discount);

			dispatch({
				type: "GET_DISCOUNT",
				data: calculateDiscount(
					response.data.discount.discount,
					course.latest_price
				),
			});

			toast.success(response.data.message, {
				style: {
					border: "1px solid #4BB543",
					padding: "16px",
					color: "#4BB543",
				},
				iconTheme: {
					primary: "#4BB543",
					secondary: "#FFFAEE",
				},
			});
		} catch (err) {
			let {
				response: {
					data: { message },
				},
			} = err;
			toast.error(message, {
				style: {
					border: "1px solid #ff0033",
					padding: "16px",
					color: "#ff0033",
				},
				iconTheme: {
					primary: "#ff0033",
					secondary: "#FFFAEE",
				},
			});
		}
	};

	return (
		<>
			<StickyBox className="sticky-box" offsetTop={100} offsetBottom={20}>
				<div className="courses-sidebar-sticky">
					<div className="courses-sidebar-information">
						<ul className="info">
							<li>
								<div className="d-flex justify-content-between align-items-center">
									<span>
										<i className="flaticon-play"></i> Live
										Class
									</span>
									{course.is_class ? (
										<div className="live-class-icon"></div>
									) : (
										"No"
									)}
								</div>
							</li>
							<li>
								<div className="d-flex justify-content-between align-items-center">
									<span>
										<i className="flaticon-teacher"></i>{" "}
										Instructor
									</span>
									{course.user && course.user.first_name}{" "}
									{course.user && course.user.last_name}
								</div>
							</li>
							<li>
								<div className="d-flex justify-content-between align-items-center">
									<span>
										<i className="flaticon-time"></i>{" "}
										Duration
									</span>
									{course.duration}
								</div>
							</li>
							<li>
								<div className="d-flex justify-content-between align-items-center">
									<span>
										<i className="flaticon-distance-learning"></i>{" "}
										Lessons
									</span>
									{course.lessons}
								</div>
							</li>
							<li>
								<div className="d-flex justify-content-between align-items-center">
									<span>
										<i className="flaticon-web"></i>{" "}
										Enrolled
									</span>
									{course.enrolments &&
										course.enrolments.length}{" "}
									students
								</div>
							</li>
							<li>
								<div className="d-flex justify-content-between align-items-center">
									<span>
										<i className="flaticon-html"></i>{" "}
										Language
									</span>
									English
								</div>
							</li>
							<li>
								<div className="d-flex justify-content-between align-items-center">
									<span>
										<i className="flaticon-caption"></i>{" "}
										Video Subtitle
									</span>
									N/A
								</div>
							</li>
							<li>
								<div className="d-flex justify-content-between align-items-center">
									<span>
										<i className="flaticon-lock"></i> Access
									</span>
									{course.access_time}
								</div>
							</li>
							<li>
								<div className="d-flex justify-content-between align-items-center">
									<span>
										<i className="flaticon-certification"></i>{" "}
										Certificate
									</span>
									Yes
								</div>
							</li>
						</ul>

						<div className="coupon">
							<h4 onClick={() => setApplyCoupon(!apply)}>
								Apply Coupon
							</h4>
							{apply && (
								<form onSubmit={handleCoupon}>
									<input
										type="text"
										className="input-search"
										placeholder="Enter Coupon"
										name="search"
										value={coupon.coupon}
										onChange={(e) =>
											setCoupon(e.target.value)
										}
									/>
									<button type="submit">
										<b>Apply</b>
									</button>
								</form>
							)}
						</div>

						<div className="btn-box">
							{alreadyBuy ? (
								<button
									onClick={() =>
										router.push("/learning/my-courses")
									}
									className="default-btn"
								>
									<i className="flaticon-shopping-cart"></i>{" "}
									View My Courses
									<span></span>
								</button>
							) : (
								<>
									{add ? (
										<Link href="/checkout">
											<a className="default-btn">
												<i className="flaticon-right-arrow"></i>{" "}
												View Cart
											</a>
										</Link>
									) : (
										<button
											onClick={() => addToCart(course)}
											className="default-btn"
											disabled={add}
										>
											{" "}
											<i className="flaticon-shopping-cart"></i>{" "}
											Add to cart
											<span></span>
										</button>
									)}
								</>
							)}
						</div>

						<SocialShareBtns />
					</div>
				</div>
			</StickyBox>
		</>
	);
};

export default CoursesDetailsSidebar;
