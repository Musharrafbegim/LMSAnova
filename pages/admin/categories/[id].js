import React, { useEffect, useState } from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import AdminSideNav from "@/components/_App/AdminSideNav";
import Link from "next/link";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import LoadingSpinner from "@/utils/LoadingSpinner";
import toast from "react-hot-toast";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

const Create = ({ user }) => {
	const router = useRouter();
	const { elarniv_users_token } = parseCookies();
	const [cat, setCat] = useState({ category: "" });
	const [loading, setLoading] = React.useState(false);
	const { id } = router.query;

	useEffect(() => {
		const fetchCat = async () => {
			try {
				const url = `${baseUrl}/api/categories/create`;
				const payload = {
					params: { catId: id },
					headers: { Authorization: elarniv_users_token },
				};
				const response = await axios.get(url, payload);
				setCat({ category: response.data.category.name });
			} catch (err) {
				console.log(err);
			}
		};

		fetchCat();
	}, [id]);

	const handleChange = (e) => {
		setCat({ category: e.target.value });
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const url = `${baseUrl}/api/categories/create`;
			const payload = {
				headers: { Authorization: elarniv_users_token },
			};
			const payloadData = { ...cat, catId: id };
			const response = await axios.put(url, payloadData, payload);
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
			router.push("/admin/categories");
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
										<Link href="/admin/categories/">
											<a>Categories</a>
										</Link>
									</li>
									<li>
										<Link href="/admin/categories/create/">
											<a>Create</a>
										</Link>
									</li>
									<li>
										<Link href={`/admin/categories/${id}/`}>
											<a className="active">Update</a>
										</Link>
									</li>
								</ul>

								{/* Form */}
								<form onSubmit={handleUpdate}>
									<div className="row">
										<div className="col-md-12">
											<div className="form-group">
												<label className="form-label fw-semibold">
													Categories
												</label>
												<input
													type="text"
													className="form-control"
													name="category"
													value={cat.category}
													onChange={handleChange}
													required={true}
												/>
											</div>
										</div>

										<div className="col-12">
											<button
												type="submit"
												className="btn default-btn"
											>
												<i className="flaticon-right-arrow"></i>
												Update <span></span>
												{loading ? (
													<LoadingSpinner />
												) : (
													""
												)}
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Create;
