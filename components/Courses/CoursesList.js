import React, { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import toast from "react-hot-toast";
import CourseCard from "./CourseCard";
import { useRouter } from "next/router";
import Pagination from "@etchteam/next-pagination";
import ShortingDropdown from "./ShortingDropdown";
import CourseSkeletonLoader from "@/utils/CourseSkeletonLoader";

const CoursesList = ({ user }) => {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pages, setPages] = useState(0);
	const [coursesCount, setCoursesCount] = useState(0);
	const router = useRouter();
	const page = router.query.page ? router.query.page : "1";
	const size = router.query.size ? router.query.size : "9";
	const short = router.query.short ? router.query.short : "";
	const search = router.query.search ? router.query.search : "";

	const fetchCourses = async () => {
		setLoading(true);

		const payload = {
			params: {
				page,
				limit: size,
				short: short,
				search: search,
			},
		};
		const response = await axios.get(`${baseUrl}/api/all-courses`, payload);
		setCourses(response.data.courses);
		setPages(response.data.totalPages);
		setCoursesCount(response.data.coursesCount);
		// console.log(response.data);
		setLoading(false);
	};
	useEffect(() => {
		fetchCourses();
	}, [page, size, short, search]);

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
			<div className="courses-area courses-section pt-50 pb-100">
				<div className="container">
					<ShortingDropdown />
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
								{coursesCount > 9 && (
									<div className="col-lg-12 col-md-12">
										<div className="pagination-area text-center">
											<Pagination
												sizes={[1]}
												total={pages}
											/>
										</div>
									</div>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default CoursesList;
