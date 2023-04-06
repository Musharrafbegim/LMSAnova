import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import BannerCourses from "./BannerCourses";

const MainBanner = ({ user, courses }) => {
	return (
		<>
			<div className="main-banner">
				<div className="container-fluid">
					<div className="row align-items-center">
						<div className="col-lg-6 col-md-12">
							<div className="main-banner-content">
								<h1>
									The World’s Leading Distance Learning
									Provider
								</h1>
								<p>
									Flexible easy to access learning
									opportunities can bring a significant change
									in how individuals prefer to learn! The
									Anova can offer you to enjoy the beauty
									of eLearning!
								</p>

								<motion.div whileTap={{ scale: 0.9 }}>
									{user ? (
										<Link href="/courses">
											<a className="default-btn">
												<i className="flaticon-user"></i>{" "}
												Browse Courses <span></span>
											</a>
										</Link>
									) : (
										<Link href="/authentication">
											<a className="default-btn">
												<i className="flaticon-user"></i>{" "}
												Join For Free <span></span>
											</a>
										</Link>
									)}
								</motion.div>
							</div>
						</div>

						<div className="col-lg-6 col-md-12">
							<div className="main-banner-courses-list">
								<div className="row">
									{courses &&
										courses.map((course) => (
											<BannerCourses
												key={course.id}
												{...course}
											/>
										))}
								</div>

								<div className="banner-shape1">
									<img
										src="/images/banner-shape1.png"
										alt="image"
									/>
								</div>
								<div className="banner-shape2">
									<img
										src="/images/banner-shape2.png"
										alt="image"
									/>
								</div>
								<div className="banner-shape3">
									<img
										src="/images/banner-shape3.png"
										alt="image"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MainBanner;
