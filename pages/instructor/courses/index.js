import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import InstructorHeader from "@/components/Instructor/InstructorHeader";
import CoursesCard from "@/components/Instructor/CoursesCard";
import axios from "axios";
import { parseCookies } from "nookies";
import baseUrl from "@/utils/baseUrl";
import GeneralLoader from "@/utils/GeneralLoader";
import toast from "react-hot-toast";

const Index = ({ user }) => {
	const { elarniv_users_token } = parseCookies();
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchCourses = async () => {
		const payload = {
			headers: { Authorization: elarniv_users_token },
		};

		const response = await axios.get(`${baseUrl}/api/courses`, payload);
		setCourses(response.data.courses);
		setLoading(false);
	};
	useEffect(() => {
		fetchCourses();
	}, []);

	const confirmDelete = (courseId) => {
		confirmAlert({
			title: "Confirm to delete",
			message: "Are you sure to delete this?",
			buttons: [
				{
					label: "Yes",
					onClick: () => handleDelete(courseId),
				},
				{
					label: "No",
				},
			],
		});
	};

	const handleDelete = async (courseId) => {
		try {
			setLoading(true);
			const payload = {
				headers: { Authorization: elarniv_users_token },
			};

			const url = `${baseUrl}/api/courses/course/${courseId}`;

			const response = await axios.delete(url, payload);
			setLoading(false);
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
			fetchCourses();
		} catch (err) {
			// console.log(err);
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
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Navbar user={user} />

			{/* Instructor header */}
			<InstructorHeader />
			{/* End Instructor header */}

			<div className="pb-100">
				<div className="container">
					<h3 className="mb-5 text-center">My Courses</h3>

					<div className="row justify-content-center">
						{loading && <GeneralLoader />}
						{courses.length > 0 ? (
							courses.map((course) => (
								<CoursesCard
									key={course.id}
									{...course}
									onDelete={() => confirmDelete(course.id)}
								/>
							))
						) : (
							<h3>Empty</h3>
						)}

						{/* Pagination */}
						{/* <div className="col-lg-12 col-md-12">
							<div className="pagination-area text-center mt-3">
								<a href="#" className="prev page-numbers">
									<i className="bx bx-chevrons-left"></i>
								</a>
								<span
									className="page-numbers current"
									aria-current="page"
								>
									1
								</span>
								<a href="#" className="page-numbers">
									2
								</a>
								<a href="#" className="page-numbers">
									3
								</a>
								<a href="#" className="page-numbers">
									4
								</a>
								<a href="#" className="next page-numbers">
									<i className="bx bx-chevrons-right"></i>
								</a>
							</div>
						</div> */}
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Index;
