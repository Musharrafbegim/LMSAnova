import React, { useEffect, useState } from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import { useRouter } from "next/router";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import CourseOverview from "@/components/Learning/CourseOverview";
import LiveClassComponent from "@/components/Learning/LiveClassComponent";

const Index = ({ user }) => {
	const [course, setCourse] = useState({});

	const {
		query: { slug },
	} = useRouter();

	const fetchVideos = async () => {
		const payload = {
			params: { slug: slug },
		};
		const url = `${baseUrl}/api/courses/course`;
		const response = await axios.get(url, payload);
		setCourse(response.data.course);
	};

	useEffect(() => {
		fetchVideos();
	}, [slug]);

	return (
		<>
			<Navbar user={user} />

			<div className="ptb-100 video-area">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-12 col-md-12">
							<div className="video-content">
								<LiveClassComponent slug={slug} {...user} />

								<CourseOverview {...course} />
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Index;
