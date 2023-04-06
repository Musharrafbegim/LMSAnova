import React, { useState, useEffect } from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import AdminSideNav from "@/components/_App/AdminSideNav";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import TestimonialRow from "@/components/Admin/TestimonialRow";
import { parseCookies } from "nookies";
import GeneralLoader from "@/utils/GeneralLoader";

const Index = ({ user }) => {
	const { elarniv_users_token } = parseCookies();
	const [testimonials, setTestimonials] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		setLoading(true);
		try {
			const payload = {
				headers: { Authorization: elarniv_users_token },
			};
			const response = await axios.get(
				`${baseUrl}/api/testimonials`,
				payload
			);
			setTestimonials(response.data.testimonials);
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

	const handleDelete = async (testId) => {
		try {
			const payload = {
				headers: { Authorization: elarniv_users_token },
				params: { testId },
			};
			const response = await axios.delete(
				`${baseUrl}/api/testimonials/create`,
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
								{/* Nav */}
								<ul className="nav-style1">
									<li>
										<Link href="/admin/testimonials/">
											<a className="active">
												Testimonials
											</a>
										</Link>
									</li>
									<li>
										<Link href="/admin/testimonials/create/">
											<a>Create</a>
										</Link>
									</li>
								</ul>

								{loading ? (
									<GeneralLoader />
								) : (
									<div className="table-responsive">
										<table className="table table-hover align-middle fs-14">
											<thead>
												<tr>
													<th scope="col">Image</th>
													<th scope="col">Name</th>
													<th scope="col">
														Designation
													</th>
													<th scope="col">Text</th>
													<th scope="col">Action</th>
												</tr>
											</thead>
											<tbody>
												{testimonials.length > 0 ? (
													testimonials.map((test) => (
														<TestimonialRow
															{...test}
															key={test.id}
															onDelete={() =>
																handleDelete(
																	test.id
																)
															}
														/>
													))
												) : (
													<tr>
														<td
															colSpan="6"
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
