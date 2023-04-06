import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CourseAsset = ({ id: courseId }) => {
	const [assets, setAssets] = useState([]);

	useEffect(() => {
		const fetchAssets = async () => {
			const url = `${baseUrl}/api/assets/${courseId}`;
			const response = await axios.get(url);
			setAssets(response.data.assets);
		};

		fetchAssets();
	}, [courseId]);

	return (
		<div className="courses-details-desc-style-two">
			<div className="row justify-content-center">
				{assets.length > 0
					? assets.map((asset) => (
							<div className="col-lg-3 col-md-6" key={asset.id}>
								<div className="card text-center">
									<i
										className="bx bx-file mt-2"
										style={{
											fontSize: "100px",
										}}
									></i>
									<div className="card-body">
										<h5 className="card-title">
											{asset.lecture_name}
										</h5>
										<button
											className="btn btn-success mt-2"
											onClick={() =>
												window.open(asset.lecture_file)
											}
										>
											Download{" "}
											<i className="bx bx-down-arrow-circle"></i>
										</button>
									</div>
								</div>
							</div>
					  ))
					: "Empty"}
			</div>
		</div>
	);
};

export default CourseAsset;
