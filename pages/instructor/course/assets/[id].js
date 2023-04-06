import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import Link from "next/link";
import axios from "axios";
import { parseCookies } from "nookies";
import baseUrl from "@/utils/baseUrl";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import CourseAssets from "@/components/Instructor/CourseAssets";
import GeneralLoader from "@/utils/GeneralLoader";
import UploadAssetForm from "../../../../components/Instructor/UploadAssetForm";
import PageNavigation from "../../../../components/Instructor/PageNavigation";

const Index = ({ user }) => {
	const { elarniv_users_token } = parseCookies();
	const router = useRouter();
	const { id: courseId } = router.query;
	const [assets, setAssets] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchAssets = async () => {
		setLoading(true);
		const payload = {
			headers: { Authorization: elarniv_users_token },
		};

		const url = `${baseUrl}/api/courses/course/assets/${courseId}`;

		const response = await axios.get(url, payload);
		setAssets(response.data.course_assets);
		setLoading(false);
	};

	useEffect(() => {
		fetchAssets();
	}, []);

	const confirmDelete = (assetId) => {
		confirmAlert({
			title: "Confirm to delete",
			message: "Are you sure to delete this?",
			buttons: [
				{
					label: "Yes",
					onClick: () => handleDelete(assetId),
				},
				{
					label: "No",
				},
			],
		});
	};

	const handleDelete = async (assetId) => {
		try {
			setLoading(true);
			const payload = {
				headers: { Authorization: elarniv_users_token },
			};

			const url = `${baseUrl}/api/courses/course/assets/${assetId}`;

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
			fetchAssets();
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
					<PageNavigation
						courseId={courseId}
						activeClassname="assets"
					/>

					{loading ? (
						<GeneralLoader />
					) : (
						<>
							<div className="create-course-form">
								<UploadAssetForm
									courseId={courseId}
									onFetchAssets={fetchAssets}
								/>
							</div>
							<div className="row justify-content-center">
								{assets.length > 0
									? assets.map((asset) => (
											<CourseAssets
												key={asset.id}
												{...asset}
												onDelete={() =>
													confirmDelete(asset.id)
												}
											/>
									  ))
									: "Empty"}
							</div>
						</>
					)}
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Index;
