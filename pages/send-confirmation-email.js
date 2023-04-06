import React from "react";
import Navbar from "@/components/_App/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import ConfirmEmail from "@/components/Authentication/ConfirmEmail";
import Footer from "@/components/_App/Footer";

export default function ForgotPasswordPage({ user }) {
	return (
		<>
			<Navbar user={user} />

			<PageBanner
				pageTitle="Send Confirmation Email"
				homePageUrl="/"
				homePageText="Home"
				activePageText="Send Confirmation Email"
			/>

			<ConfirmEmail />

			<Footer />
		</>
	);
}
