import React, { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import Link from "next/link";
import axios from "axios";
import { parseCookies } from "nookies";
import LoadingSpinner from "@/utils/LoadingSpinner";
import baseUrl from "@/utils/baseUrl";

const BasicInformation = ({ user }) => {
	const { elarniv_users_token } = parseCookies();
	const [userUpdate, setUserUpdate] = useState(user);
	const [loading, setLoading] = React.useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserUpdate((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const url = `${baseUrl}/api/users/update`;
			const data = { ...userUpdate };
			const payload = {
				headers: { Authorization: elarniv_users_token },
			};
			const response = await axios.put(url, data, payload);

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
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Navbar user={user} />

			<div className="ptb-100">
				<div className="container">
					<h2 className="fw-bold mb-4">Profile & Settings</h2>

					<ul className="nav-style1">
						<li>
							<Link href="/profile/basic-information">
								<a className="active">Profile</a>
							</Link>
						</li>
						<li>
							<Link href="/profile/photo">
								<a>Profile Picture</a>
							</Link>
						</li>
					</ul>

					<div className="basic-profile-information-form">
						<form onSubmit={handleSubmit}>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<label className="form-label fw-semibold">
											First Name
										</label>
										<input
											type="text"
											className="form-control"
											name="first_name"
											value={userUpdate.first_name}
											onChange={handleChange}
										/>
									</div>

									<div className="form-group">
										<label className="form-label fw-semibold">
											Last Name
										</label>
										<input
											type="text"
											className="form-control"
											name="last_name"
											value={userUpdate.last_name}
											onChange={handleChange}
										/>
									</div>

									<div className="form-group">
										<label className="form-label fw-semibold">
											Biography
										</label>
										<textarea
											type="text"
											className="form-control"
											name="bio"
											value={userUpdate.bio}
											onChange={handleChange}
											rows="4"
										/>
										<p className="form-text mt-2">
											Your biography should have at least
											50 characters, links and coupon
											codes are not permitted.
										</p>
									</div>

									<div className="form-group" name="gender">
										<label className="form-label fw-semibold">
											Language
										</label>
										<select className="form-select">
											<option defaultValue="Male">
												Male
											</option>
											<option defaultValue="Female">
												Female
											</option>
										</select>
									</div>
								</div>

								<div className="col-md-6">
									<div className="form-group">
										<label className="form-label fw-semibold">
											Website URL
										</label>
										<input
											type="text"
											className="form-control"
											id="websiteURL"
											placeholder="http://www.example.com/"
											name="website"
											value={userUpdate.website}
											onChange={handleChange}
										/>
									</div>

									<div className="form-group">
										<label className="form-label fw-semibold">
											Twitter
										</label>
										<input
											type="text"
											className="form-control"
											name="twitter"
											value={userUpdate.twitter}
											onChange={handleChange}
											placeholder="http://www.twitter.com/"
										/>
									</div>

									<div className="form-group">
										<label className="form-label fw-semibold">
											Facebook
										</label>
										<input
											type="text"
											className="form-control"
											name="facebook"
											value={userUpdate.facebook}
											onChange={handleChange}
											placeholder="http://www.facebook.com/"
										/>
									</div>

									<div className="form-group">
										<label className="form-label fw-semibold">
											Linkedin
										</label>
										<input
											type="text"
											className="form-control"
											name="linkedin"
											value={userUpdate.linkedin}
											onChange={handleChange}
											placeholder="http://www.linkedin.com/"
										/>
									</div>

									<div className="form-group">
										<label className="form-label fw-semibold">
											Youtube
										</label>
										<input
											type="text"
											className="form-control"
											name="youtube"
											value={userUpdate.youtube}
											onChange={handleChange}
											placeholder="http://www.youtube.com/"
										/>
									</div>
								</div>

								<div className="col-12">
									<button
										type="submit"
										className="btn default-btn"
									>
										<i className="flaticon-right-arrow"></i>
										Save <span></span>
										{loading ? <LoadingSpinner /> : ""}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default BasicInformation;
