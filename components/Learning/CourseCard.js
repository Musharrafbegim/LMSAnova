import React from "react";
import Link from "next/link";

const CourseCard = ({ course: { user, image, title, slug, is_class } }) => {
	console.log(is_class);
	return (
		<div className="col-lg-4 col-md-6">
			<div className="single-courses-box style-2">
				<div className="courses-image">
					{is_class ? (
						<Link href={`/learning/course/class/${slug}`}>
							<a className="d-block image">
								<img src={image} alt={title} />
							</a>
						</Link>
					) : (
						<Link href={`/learning/course/${slug}`}>
							<a className="d-block image">
								<img src={image} alt={title} />
							</a>
						</Link>
					)}

					<div className="video_box">
						<div className="d-table">
							<div className="d-table-cell">
								{is_class ? (
									<Link
										href={`/learning/course/class/${slug}`}
									>
										<a>
											<i className="bx bx-play"></i>
										</a>
									</Link>
								) : (
									<Link href={`/learning/course/${slug}`}>
										<a>
											<i className="bx bx-play"></i>
										</a>
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="courses-content">
					<h3>
						{is_class ? (
							<Link href={`/learning/course/class/${slug}`}>
								<a>{title}</a>
							</Link>
						) : (
							<Link href={`/learning/course/${slug}`}>
								<a>{title}</a>
							</Link>
						)}
					</h3>

					<div className="course-author d-flex align-items-center">
						<span>{`${user.first_name} ${user.last_name}`}</span>
					</div>

					<p>Start Course</p>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
