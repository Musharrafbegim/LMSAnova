import React, { useState, useEffect } from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import AdminSideNav from "@/components/_App/AdminSideNav";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import PartnerRow from "@/components/Admin/PartnerRow";
import GeneralLoader from "@/utils/GeneralLoader";

const Index = ({ user }) => {
	const [partners, setPartners] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`${baseUrl}/api/partners`);
			setPartners(response.data.partners);
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

	const handleDelete = async (partnerId) => {
		try {
			const payload = {
				params: { partnerId },
			};
			const response = await axios.delete(
				`${baseUrl}/api/partners/create`,
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

		// router.reload(`/admin/categories/`);
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
										<Link href="/admin/partners/">
											<a className="active">Partners</a>
										</Link>
									</li>
									<li>
										<Link href="/admin/partners/create/">
											<a>Create</a>
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
													<th scope="col">Name</th>
													<th scope="col">Image</th>
													<th scope="col">Action</th>
												</tr>
											</thead>
											<tbody>
												{partners.length > 0 ? (
													partners.map((partner) => (
														<PartnerRow
															key={partner.id}
															{...partner}
															onDelete={() =>
																handleDelete(
																	partner.id
																)
															}
														/>
													))
												) : (
													<tr>
														<td
															colSpan="4"
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
