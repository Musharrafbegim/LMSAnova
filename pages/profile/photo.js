import React, { useState } from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import Link from "next/link";
import { parseCookies } from "nookies";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { useRouter } from "next/router";
import baseUrl from "@/utils/baseUrl";

const Photo = ({ user }) => {
	const { elarniv_users_token } = parseCookies();
	const router = useRouter();
	const [avatar, setAvatar] = useState(user);
	const [loading, setLoading] = React.useState(false);
	const [profilePreview, setProfilePreview] = React.useState("");

	const handleChange = (e) => {
		const { files } = e.target;

		const profilePhotoSize = files[0].size / 1024 / 1024;
		if (profilePhotoSize > 2) {
			toast.error(
				"The profile photo size greater than 2 MB. Make sure less than 2 MB.",
				{
					style: {
						border: "1px solid #ff0033",
						padding: "16px",
						color: "#ff0033",
					},
					iconTheme: {
						primary: "#ff0033",
						secondary: "#FFFAEE",
					},
				}
			);
			e.target.value = null;
			return;
		}

		setAvatar({
			profile_photo: files[0],
		});
		setProfilePreview(window.URL.createObjectURL(files[0]));
	};

	const handleProfilePhotoUpload = async () => {
		// console.log(avatar);
		const data = new FormData();
		data.append("file", avatar.profile_photo);
		data.append("upload_preset", process.env.UPLOAD_PRESETS);
		data.append("cloud_name", process.env.CLOUD_NAME);

		let response;
		if (avatar) {
			response = await axios.post(process.env.CLOUDINARY_URL, data);
		}
		const profilePhotoUrl = response.data.url;
		return profilePhotoUrl;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// console.log(avatar);
			let profile = "";
			if (avatar) {
				profile = await handleProfilePhotoUpload();
				profile = profile.replace(/^http:\/\//i, "https://");
			}
			// console.log(profile);
			const url = `${baseUrl}/api/users/profile-photo`;
			const payload = {
				profile_photo: profile,
			};
			const response = await axios.put(url, payload, {
				headers: { Authorization: elarniv_users_token },
			});
			setLoading(false);
			toast.success(response.data.message);
			router.push("/");
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
								<a>Profile</a>
							</Link>
						</li>
						<li>
							<Link href="/profile/photo">
								<a className="active">Profile Picture</a>
							</Link>
						</li>
					</ul>

					<div className="basic-profile-information-form">
						<form onSubmit={handleSubmit}>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<label className="form-label fw-semibold">
											Profile Image
										</label>
										<input
											type="file"
											className="form-control file-control"
											name="profilePhoto"
											accept="image/*"
											onChange={handleChange}
											required={true}
										/>
										<div className="form-text mt-2">
											Upload image size 200x200 pixels!
										</div>

										<div className="mt-3">
											{profilePreview ? (
												<img
													src={profilePreview}
													className="img-thumbnail mw-200px"
												/>
											) : (
												<img
													src="/images/avatar.jpg"
													alt="image"
													className="img-thumbnail mw-200px"
												/>
											)}
										</div>
									</div>
								</div>

								<div className="col-12">
									<button
										className="btn default-btn"
										type="submit"
									>
										<i className="flaticon-right-arrow"></i>
										Save <span></span>
										{loading ? <LoadingSpinner /> : ""}
										<span></span>
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

export default Photo;
