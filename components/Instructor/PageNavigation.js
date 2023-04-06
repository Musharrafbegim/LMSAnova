import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { parseCookies } from "nookies";
import baseUrl from "@/utils/baseUrl";

const PageNavigation = ({ courseId, activeClassname }) => {
	const { elarniv_users_token } = parseCookies();
	const [course, setCourse] = useState({ title: "" });

	useEffect(() => {
		const fetchCourse = async () => {
			const payload = {
				headers: { Authorization: elarniv_users_token },
			};
			const url = `${baseUrl}/api/courses/course/${courseId}`;
			const response = await axios.get(url, payload);
			setCourse({ title: response.data.course.title });
		};

		fetchCourse();
	}, []);

	return (
		<>
			<h2 className="fw-bold mb-4">Title: {course && course.title}</h2>

			<ul className="nav-style1">
				<li>
					<Link href="/instructor/courses/">
						<a>Courses</a>
					</Link>
				</li>
				<li>
					<Link href="/instructor/course/create/">
						<a>Create Course</a>
					</Link>
				</li>
				<li>
					<Link href={`/instructor/course/edit/${courseId}`}>
						<a
							className={
								activeClassname == "edit" ? "active" : ""
							}
						>
							Edit Course
						</a>
					</Link>
				</li>
				<li>
					<Link href={`/instructor/course/upload/${courseId}`}>
						<a
							className={
								activeClassname == "upload" ? "active" : ""
							}
						>
							Upload Video
						</a>
					</Link>
				</li>
				<li>
					<Link href={`/instructor/course/uploads/${courseId}`}>
						<a
							className={
								activeClassname == "uploads" ? "active" : ""
							}
						>
							Videos
						</a>
					</Link>
				</li>
				<li>
					<Link href={`/instructor/course/assets/${courseId}`}>
						<a
							className={
								activeClassname == "assets" ? "active" : ""
							}
						>
							Assets
						</a>
					</Link>
				</li>
			</ul>
		</>
	);
};

export default PageNavigation;
