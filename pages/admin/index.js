import React from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import AdminSideNav from "@/components/_App/AdminSideNav";
import baseUrl from "@/utils/baseUrl";

const Index = ({
	students,
	instructors,
	courses,
	enrolments,
	earningsTotal,
	videos,
	assets,
	user,
}) => {
	return (
		<>
			<Navbar user={user} />

			<div className="main-content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-3 col-md-4">
							<AdminSideNav user={user} />
						</div>

						<div className="col-lg-9 col-md-8">
							<div className="main-content-box">
								<div className="row justify-content-center">
									<div className="col-lg-4 col-sm-6">
										<div className="info-box-card">
											<i className="bx bx-group"></i>
											<h1>{students}</h1>
											<p>Total Students</p>
										</div>
									</div>

									<div className="col-lg-4 col-sm-6">
										<div className="info-box-card">
											<i className="bx bxs-file"></i>
											<h1>{courses}</h1>
											<p>Total Courses</p>
										</div>
									</div>

									<div className="col-lg-4 col-sm-6">
										<div className="info-box-card">
											<i className="bx bx-group"></i>
											<h1>{instructors}</h1>
											<p>Total Instructors</p>
										</div>
									</div>

									<div className="col-lg-4 col-sm-6">
										<div className="info-box-card">
											<i className="bx bx-cart"></i>
											<h1>{enrolments}</h1>
											<p>Course Enrolled</p>
										</div>
									</div>

									<div className="col-lg-4 col-sm-6">
										<div className="info-box-card">
											<i className="bx bx-cart"></i>
											<h1>${earningsTotal}</h1>
											<p>Total Sale</p>
										</div>
									</div>

									<div className="col-lg-4 col-sm-6">
										<div className="info-box-card">
											<i className="bx bx-cart"></i>
											<h1>{videos}</h1>
											<p>Course Videos</p>
										</div>
									</div>
									<div className="col-lg-4 col-sm-6">
										<div className="info-box-card">
											<i className="bx bx-cart"></i>
											<h1>{assets}</h1>
											<p>Course Assets</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

// This gets called on every request
export async function getServerSideProps() {
	// Fetch data from external API
	const res = await fetch(`${baseUrl}/api/funfacts`);
	const {
		students,
		instructors,
		courses,
		enrolments,
		earningsTotal,
		videos,
		assets,
	} = await res.json();

	// Pass data to the page via props
	return {
		props: {
			students,
			instructors,
			courses,
			enrolments,
			earningsTotal,
			videos,
			assets,
		},
	};
}

export default Index;
