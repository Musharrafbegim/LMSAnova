import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import AdminSideNav from "@/components/_App/AdminSideNav";
import toast from "react-hot-toast";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import CouponRow from "@/components/Admin/CouponRow";
import { parseCookies } from "nookies";
import GeneralLoader from "@/utils/GeneralLoader";
import { confirmAlert } from "react-confirm-alert";

const index = ({ user }) => {
	const { elarniv_users_token } = parseCookies();
	const [coupons, setCoupons] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		setLoading(true);
		try {
			const payload = {
				headers: { Authorization: elarniv_users_token },
			};
			const response = await axios.get(`${baseUrl}/api/coupons`, payload);
			setCoupons(response.data.coupons);
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

	const confirmDelete = (couponId) => {
		confirmAlert({
			title: "Confirm to delete",
			message: "Are you sure to delete this?",
			buttons: [
				{
					label: "Yes",
					onClick: () => handleDelete(couponId),
				},
				{
					label: "No",
				},
			],
		});
	};

	const handleDelete = async (couponId) => {
		try {
			const payload = {
				headers: { Authorization: elarniv_users_token },
				params: { couponId },
			};
			const response = await axios.delete(
				`${baseUrl}/api/coupons`,
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

	const setFull = async (couponId) => {
		const payload = {
			headers: { Authorization: elarniv_users_token },
		};

		const payloadData = { couponId: couponId };

		const response = await axios.put(
			`${baseUrl}/api/coupons/new`,
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
										<Link href="/admin/coupons/">
											<a className="active">Coupons</a>
										</Link>
									</li>
									<li>
										<Link href="/admin/coupons/create/">
											<a>Create</a>
										</Link>
									</li>
									<li>
										<Link href="/admin/coupons/modal-in-site-loading/">
											<a>Site Modal</a>
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
													<th scope="col">Coupons</th>
													<th scope="col">
														Discount
													</th>
													<th scope="col">
														Coupon active for all
														courses
													</th>
													<th scope="col">Action</th>
												</tr>
											</thead>
											<tbody>
												{coupons.length > 0 ? (
													coupons.map((coupon) => (
														<CouponRow
															{...coupon}
															key={coupon.id}
															onCheck={() =>
																setFull(
																	coupon.id
																)
															}
															onDelete={() =>
																confirmDelete(
																	coupon.id
																)
															}
														/>
													))
												) : (
													<tr>
														<td
															colSpan="3"
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

export default index;
