import React, { useEffect, useState } from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import CourseUpdateForm from "@/components/Instructor/CourseUpdateForm";
import { useRouter } from "next/router";
import axios from "axios";
import { parseCookies } from "nookies";
import baseUrl from "@/utils/baseUrl";
import PageNavigation from "../../../../components/Instructor/PageNavigation";

const Create = ({ user }) => {
	const { elarniv_users_token } = parseCookies();
	const router = useRouter();
	const { id: courseId } = router.query;
	const [course, setCourse] = useState({});

	useEffect(() => {
		const fetchCourse = async () => {
			const payload = {
				headers: { Authorization: elarniv_users_token },
			};
			const url = `${baseUrl}/api/courses/course/${courseId}`;
			const response = await axios.get(url, payload);
			setCourse(response.data.course);
		};

		fetchCourse();
	}, []);

	return (
		<>
			<Navbar user={user} />

			<div className="ptb-100">
				<div className="container">
					<PageNavigation
						courseId={courseId}
						activeClassname="edit"
					/>

					<div className="create-course-form">
						{course && <CourseUpdateForm courseData={course} />}
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Create;
