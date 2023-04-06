import React, { useState, useEffect } from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import AdminSideNav from "@/components/_App/AdminSideNav";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { parseCookies } from "nookies";
import GeneralLoader from "@/utils/GeneralLoader";
import CourseRow from "@/components/Admin/CourseRow";

const Index = ({ user }) => {
	const { elarniv_users_token } = parseCookies();
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		setLoading(true);
		try {
			const payload = {
				headers: { Authorization: elarniv_users_token },
			};
			const response = await axios.get(
				`${baseUrl}/api/admin/courses`,
				payload
			);
			// console.log(response.data.courses);
			setCourses(response.data.courses);
			setLoading(false);
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
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleCourseHome = async (courseId) => {
		try {
			const payload = {
				headers: { Authorization: elarniv_users_token },
			};

			const payloadData = { courseId, apply: true };
			const response = await axios.put(
				`${baseUrl}/api/admin/courses`,
				payloadData,
				payload
			);
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
			fetchData();
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
		} finally {
			setLoading(false);
			fetchData();
		}
	};

	const handleCourseRemoveHome = async (courseId) => {
		try {
			const payload = {
				headers: { Authorization: elarniv_users_token },
			};

			const payloadData = { courseId, apply: false };
			const response = await axios.put(
				`${baseUrl}/api/admin/courses`,
				payloadData,
				payload
			);
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
			fetchData();
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
		} finally {
			setLoading(false);
			fetchData();
		}
	};

	return (
		<>
			<Navbar user={user} />

			<div className="main-content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-3 col-md-4">
							<AdminSideNav user={user} />
						</div>

						<div className="col-lg-9 col-md-8">
							<div className="main-content-box">
								<ul className="nav-style1">
									<li>
										<Link href="/admin/courses/">
											<a className="active">Courses</a>
										</Link>
									</li>
									<li>
										<Link href="/admin/courses/new-arrival/">
											<a>New Arrival</a>
										</Link>
									</li>
								</ul>
								{loading ? (
									<GeneralLoader />
								) : (
									<div className="table-responsive">
										<table className="table align-middle table-hover fs-14">
											<thead>
												<tr>
													<th scope="col">Title</th>
													<th scope="col">Price</th>
													<th scope="col">
														Category
													</th>
													<th scope="col">
														Instructor
													</th>
													<th scope="col">Videos</th>
													<th scope="col">
														Homepage
													</th>
													<th scope="col">Status</th>
												</tr>
											</thead>
											<tbody>
												{courses.length > 0 ? (
													courses.map((course) => (
														<CourseRow
															key={course.id}
															{...course}
															onHome={() =>
																handleCourseHome(
																	course.id
																)
															}
															onHomeRemove={() =>
																handleCourseRemoveHome(
																	course.id
																)
															}
														/>
													))
												) : (
													<tr>
														<td
															colSpan="7"
															className="text-center py-3"
														>
															Empty!
														</td>
													</tr>
												)}
											</tbody>
										</table>
									</div>
								)}
								{/* Pagination */}
								{/* <div className="col-lg-12 col-md-12">
									<div className="pagination-area text-center m-3">
										<a
											href="#"
											className="prev page-numbers"
										>
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
										<a
											href="#"
											className="next page-numbers"
										>
											<i className="bx bx-chevrons-right"></i>
										</a>
									</div>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Index;
