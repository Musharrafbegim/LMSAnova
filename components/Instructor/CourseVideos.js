import React from "react";

const CourseVideos = ({ id: videoId, title, thumb, video, onDelete }) => {
	return (
		<div className="col-lg-3 col-md-6">
			<div className="card" style={{ width: "18rem" }}>
				<img
					src={thumb ? thumb : ""}
					className="card-img-top"
					alt="..."
				/>
				<div className="card-body">
					<h5 className="card-title">{title}</h5>
					<button
						onClick={() => onDelete(videoId)}
						className="btn btn-danger"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default CourseVideos;
