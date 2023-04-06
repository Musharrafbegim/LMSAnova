import React from "react";
import Navbar from "@/components/_App/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import LoginForm from "@/components/Authentication/LoginForm";
import RegisterForm from "@/components/Authentication/RegisterForm";
import Footer from "@/components/_App/Footer";

export default function AuthenticationPage({ user }) {
	return (
		<>
			<Navbar user={user} />

			<PageBanner
				pageTitle="Authentication"
				homePageUrl="/"
				homePageText="Home"
				activePageText="Authentication"
			/>

			<div className="profile-authentication-area ptb-100">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 col-md-12">
							<LoginForm />
						</div>

						<div className="col-lg-6 col-md-12">
							<RegisterForm />
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
}
