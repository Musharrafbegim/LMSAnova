import React from "react";
import Link from "next/link";

const Features = () => {
	return (
		<>
			<div className="features-area pt-100 pb-70">
				<div className="container">
					<div className="section-title">
						<span className="sub-title">
							Education for everyone
						</span>
						<h2>
							Affordable Online Courses and Learning
							Opportunities​
						</h2>
						<p>
							Finding your own space and utilize better learning
							options can result in faster than the traditional
							ways. Enjoy the beauty of eLearning!
						</p>
					</div>

					<div className="row justify-content-center">
						<div className="col-lg-4 col-sm-6 col-md-6">
							<div className="single-features-box">
								<div className="icon">
									<i className="flaticon-brain-process"></i>
								</div>
								<h3>Learn the Latest Top Skills</h3>
								<p>
									Learning top skills can bring an
									extra-ordinary outcome in a career.
								</p>
							</div>
						</div>

						<div className="col-lg-4 col-sm-6 col-md-6">
							<div className="single-features-box">
								<div className="icon">
									<i className="flaticon-computer"></i>
								</div>
								<h3>Learn in Your Own Pace</h3>
								<p>
									Everyone prefers to enjoy learning at their
									own pace & that gives a great result.
								</p>
							</div>
						</div>

						<div className="col-lg-4 col-sm-6 col-md-6">
							<div className="single-features-box">
								<div className="icon">
									<i className="flaticon-shield-1"></i>
								</div>
								<h3>Learn From Industry Experts</h3>
								<p>
									Experienced teachers can assist in learning
									faster with their best approaches!
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Features;
