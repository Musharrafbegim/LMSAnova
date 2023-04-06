import React from "react";
import Navbar from "@/components/_App/Navbar";
import MainBanner from "@/components/AnovaSchool/MainBanner";
import Partner from "@/components/AnovaSchool/Partner";
import Features from "@/components/AnovaSchool/Features";
import AboutUs from "@/components/AnovaSchool/AboutUs";
import PopularCourses from "@/components/AnovaSchool/PopularCourses";
import FeedbackSliderWithFunFacts from "@/components/AnovaSchool/FeedbackSliderWithFunFacts";
import GetInstantCourses from "@/components/AnovaSchool/GetInstantCourses";
import ViewAllCourses from "@/components/AnovaSchool/ViewAllCourses";
import SubscribeForm from "@/components/Common/SubscribeForm";
import Footer from "@/components/_App/Footer";
import baseUrl from "@/utils/baseUrl";

function Index({ courses, user }) {
	return (
		<>
			<Navbar user={user} />
			<MainBanner user={user} courses={courses} />
			<Features />
			<AboutUs />
			<PopularCourses user={user} />
			<FeedbackSliderWithFunFacts />
			<GetInstantCourses user={user} />
			<ViewAllCourses />
			<Partner />
			<SubscribeForm />
			<Footer />
		</>
	);
}

// This gets called on every request
export async function getServerSideProps() {
	// Fetch data from external API
	const res = await fetch(`${baseUrl}/api/home-banner`);
	const { courses } = await res.json();

	// Pass data to the page via props
	return{props: {courses}}
}

export default Index;
