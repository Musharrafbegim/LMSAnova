import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/_App/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import CoursesDetailsContent from "@/components/SingleCourses/CoursesDetailsContent";
import Footer from "@/components/_App/Footer";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import toast from "react-hot-toast";

export default function SingleCoursesPage({ user }) {
	const [course, setCourse] = useState({});
	const router = useRouter();
	const { slug } = router.query;

	useEffect(() => {
		const fetchCourse = async () => {
			try {
				const payload = {
					params: { slug: slug },
				};
				const url = `${baseUrl}/api/courses/course`;
				const response = await axios.get(url, payload);
				setCourse(response.data.course);
			} catch (err) {
				let {
					response: {
						data: { message },
					},
				} = err;
				toast.error(message, {
					style: {
						border: "1px solid #ff0033",
						padding: "16px",
						color: "#ff0033",
					},
					iconTheme: {
						primary: "#ff0033",
						secondary: "#FFFAEE",
					},
				});
			}
		};

		fetchCourse();
	}, [slug]);
	return (
		<>
			<Navbar user={user} />

			<PageBanner
				pageTitle={course && course.title}
				homePageUrl="/"
				homePageText="Home"
				activePageText={course && course.title}
			/>

			{course && <CoursesDetailsContent user={user} course={course} />}

			<Footer />
		</>
	);
}
