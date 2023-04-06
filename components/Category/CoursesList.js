import React, { useState, useEffect } from "react";
import CourseCard from "@/components/Courses/CourseCard";
import CourseSkeletonLoader from "@/utils/CourseSkeletonLoader";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { toast } from "react-hot-toast";

const CoursesList = ({ user }) => {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const { slug } = router.query;

	const fetchCourses = async () => {
		setLoading(true);

		const response = await axios.get(`${baseUrl}/api/categories/${slug}`);
		setCourses(response.data.courses.courses);
		setLoading(false);
	};

	useEffect(() => {
		fetchCourses();
	}, [slug]);

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
			<div className="courses-area courses-section ptb-100">
				<div className="container">
					<div className="row">
						{loading ? (
							<CourseSkeletonLoader />
						) : (
							<>
								{courses &&
									courses.map((course) => (
										<CourseCard
											key={course.id}
											{...course}
											onFav={() =>
												handleFav(course.id, true)
											}
											onUnFav={() =>
												handleFav(course.id, false)
											}
											userId={user && user.id}
										/>
									))}
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default CoursesList;
