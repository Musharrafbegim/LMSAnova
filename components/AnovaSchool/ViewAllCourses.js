import React from "react";
import Link from "next/link";

const ViewAllCourses = () => {
	return (
		<>
			<div className="view-all-courses-area ptb-100 bg-F6F1ED">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6 col-md-12">
							<div className="view-all-courses-content">
								<span className="sub-title">
									Distance learning
								</span>
								<h2>Feel Like You Are Missing Something?</h2>
								<p>
								Anova training programs can bring you a
									super exciting experience of learning
									through online! You never face any negative
									experience while enjoying your Classes
									virtually by sitting in your comfort zone.
									Our flexible learning initiatives will help
									you to learn better and quicker than the
									traditional ways of learning.
								</p>

								<Link href="/learning/wishlist/">
									<a className="default-btn">
										<i className="flaticon-agenda"></i>{" "}
										Review My Wishlist <span></span>
									</a>
								</Link>
							</div>
						</div>

						<div className="col-lg-6 col-md-12">
							<div className="view-all-courses-image">
								<img
									src="/images/man-with-laptop.png"
									alt="image"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="shape1">
					<img src="/images/shape1.png" alt="image" />
				</div>
				<div className="shape9">
					<img src="/images/shape8.svg" alt="image" />
				</div>
			</div>
		</>
	);
};

export default ViewAllCourses;
