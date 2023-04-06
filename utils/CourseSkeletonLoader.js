import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const CourseSkeletonLoader = () => {
	return (
		<>
			<div className="col-lg-4 col-md-6">
				<div className="single-courses-box">
					<div className="courses-image">
						<Skeleton height="200px" width="290px" />
					</div>
					<div className="courses-content">
						<Skeleton count={3} />
					</div>
				</div>
			</div>
			<div className="col-lg-4 col-md-6">
				<div className="single-courses-box">
					<div className="courses-image">
						<Skeleton height="200px" width="290px" />
					</div>
					<div className="courses-content">
						<Skeleton count={3} />
					</div>
				</div>
			</div>
			<div className="col-lg-4 col-md-6">
				<div className="single-courses-box">
					<div className="courses-image">
						<Skeleton height="200px" width="290px" />
					</div>
					<div className="courses-content">
						<Skeleton count={3} />
					</div>
				</div>
			</div>
		</>
	);
};

export default CourseSkeletonLoader;
