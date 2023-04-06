import React from "react";
import Link from "next/link";

const GetInstantCourses = ({ user }) => {
	return (
		<>
			<div className="get-instant-courses-area ptb-100">
				<div className="container">
					<div className="get-instant-courses-inner-area">
						<div className="row align-items-center">
							<div className="col-lg-8 col-md-12">
								<div className="get-instant-courses-content">
									<span className="sub-title">
										Get Instant Access to The Free
									</span>
									<h2>Self Development Course</h2>
									<p>
									Anova Self Development Course can
										assist you in bringing the significant
										changes in personal understanding and
										reshaping the confidence to achieve the
										best from your career! We trust that
										learning should be enjoyable, and only
										that can make substantial changes!
									</p>

									{user ? (
										<Link href="/learning/my-courses/">
											<a className="default-btn">
												<i className="flaticon-user"></i>{" "}
												My Courses <span></span>
											</a>
										</Link>
									) : (
										<Link href="/authentication">
											<a className="default-btn">
												<i className="flaticon-user"></i>{" "}
												Start For Free <span></span>
											</a>
										</Link>
									)}
								</div>
							</div>

							<div className="col-lg-4 col-md-12">
								<div className="get-instant-courses-image">
									<img src="/images/man.jpg" alt="image" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default GetInstantCourses;
