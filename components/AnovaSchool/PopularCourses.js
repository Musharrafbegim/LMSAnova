import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import CourseCard from "../Courses/CourseCard";
import { toast } from "react-hot-toast";

const PopularCourses = ({ user }) => {
	const [courses, setCourses] = useState([]);

	const fetchCourses = async () => {
		const payload = {
			params: {
				page: 1,
				limit: 3,
				short: "",
				search: "",
			},
		};

		const response = await axios.get(`${baseUrl}/api/all-courses`, payload);
		setCourses(response.data.courses);
		// console.log(response.data.courses);
	};
	useEffect(() => {
		fetchCourses();
	}, []);

	const handleFav = async (courseId, fav) => {
		if (!user) {
			toast.error("Need to login first.", {
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
			return;
		}
		try {
			const payload = {
				userId: user.id,
				courseId: courseId,
				fav: fav,
			};
			const url = `${baseUrl}/api/favourites/new`;
			const response = await axios.post(url, payload);

			toast.success(response.data.message, {
				style: {
					border: "1px solid #42ba96",
					padding: "16px",
					color: "#42ba96",
				},
				iconTheme: {
					primary: "#42ba96",
					secondary: "#ffffff",
				},
			});
		} catch (err) {
			console.log(err.response);
		}
	};

	return (
		<>
			<div className="courses-area ptb-100">
				<div className="container">
					<div className="section-title">
						<span className="sub-title">
							Learn At Your Own Pace
						</span>
						<h2>Anova Popular Courses</h2>
						<p>
							Explore all of our courses and pick your suitable
							ones to enroll and start learning with us! We ensure
							that you will never regret it!
						</p>
					</div>

					<div className="row">
						{courses &&
							courses.map((course) => (
								<CourseCard
									key={course.id}
									{...course}
									onFav={() => handleFav(course.id, true)}
									onUnFav={() => handleFav(course.id, false)}
									userId={user && user.id}
								/>
							))}

						<div className="col-lg-12 col-md-12">
							<div className="courses-info">
								<p>
									Enjoy the top notch learning methods and
									achieve next level skills! You are the
									creator of your own career & we will guide
									you through that.{" "}
									{!user && (
										<Link href="/authentication">
											<a>Register Free Now!</a>
										</Link>
									)}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PopularCourses;
