import React, { useEffect, useState } from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import StickyBox from "react-sticky-box";
import Player from "@/components/Learning/Player";
import { useRouter } from "next/router";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import VideoList from "@/components/Learning/VideoList";
import ProgressManager from "@/components/Learning/ProgressManager";
import CourseOverview from "@/components/Learning/CourseOverview";
import Link from "next/link";
import CourseAsset from "@/components/Learning/CourseAsset";
import CourseDiscussion from "@/components/Learning/CourseDiscussion";
import CourseRating from "@/components/Learning/CourseRating";
import CourseFeedback from "@/components/Learning/CourseFeedback";

const Index = ({ user }) => {
	const [videos, setVideos] = useState([]);
	const [course, setCourse] = useState({});
	const [selectedVideo, setSelectedVideo] = useState("");
	const [active, setActive] = useState("");
	const [tab, setTab] = useState("overview");
	const {
		query: { slug },
	} = useRouter();

	const fetchVideos = async () => {
		const url = `${baseUrl}/api/learnings/videos/${slug}`;
		const response = await axios.get(url);
		setVideos(response.data.videos);
		setSelectedVideo(response.data.videos[0].video);
		setActive(response.data.videos[0].id);
		setCourse(response.data.course);
	};

	useEffect(() => {
		fetchVideos();
	}, [slug]);

	const selectVideo = async (videoId) => {
		// console.log(videoId);
		try {
			const payload = {
				params: { userId: user.id, courseId: course.id },
			};
			const url = `${baseUrl}/api/learnings/video/${videoId}`;
			const response = await axios.get(url, payload);
			const {
				data: { video },
			} = response;

			setSelectedVideo(video.video);
			setActive(video.id);

			// console.log(video);
		} catch (err) {
			console.log(err.response.data);
		}
	};

	return (
		<>
			<Navbar user={user} />

			<div className="mt-5 pb-5 video-area">
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-9 col-md-8">
							<div className="video-content">
								{selectedVideo && (
									<Player videoSrc={selectedVideo} />
								)}

								<br />
								<ul className="nav-style1">
									<li>
										<Link href={`/learning/course/${slug}`}>
											<a
												onClick={(e) => {
													e.preventDefault();
													setTab("overview");
												}}
												className={
													tab == "overview"
														? "active"
														: ""
												}
											>
												Overview
											</a>
										</Link>
									</li>
									<li>
										<Link href={`/learning/course/${slug}`}>
											<a
												onClick={(e) => {
													e.preventDefault();
													setTab("asset");
												}}
												className={
													tab == "asset"
														? "active"
														: ""
												}
											>
												Assets
											</a>
										</Link>
									</li>
									<li>
										<Link href={`/learning/course/${slug}`}>
											<a
												onClick={(e) => {
													e.preventDefault();
													setTab("discussion");
												}}
												className={
													tab == "discussion"
														? "active"
														: ""
												}
											>
												Discussion
											</a>
										</Link>
									</li>
									<li>
										<Link href={`/learning/course/${slug}`}>
											<a
												onClick={(e) => {
													e.preventDefault();
													setTab("rating");
												}}
												className={
													tab == "rating"
														? "active"
														: ""
												}
											>
												Leave a rating
											</a>
										</Link>
									</li>
									<li>
										<Link href={`/learning/course/${slug}`}>
											<a
												onClick={(e) => {
													e.preventDefault();
													setTab("feedback");
												}}
												className={
													tab == "feedback"
														? "active"
														: ""
												}
											>
												Leave a feedback
											</a>
										</Link>
									</li>
								</ul>

								{course && tab == "asset" ? (
									<CourseAsset {...course} />
								) : tab == "discussion" ? (
									<CourseDiscussion {...course} />
								) : tab == "rating" ? (
									<CourseRating {...course} />
								) : tab == "feedback" ? (
									<CourseFeedback {...course} />
								) : (
									<CourseOverview {...course} />
								)}
							</div>
						</div>

						<div className="col-lg-3 col-md-4">
							<StickyBox offsetTop={20} offsetBottom={20}>
								<div className="video-sidebar">
									<ProgressManager
										videos_count={videos.length}
										userId={user.id}
										courseId={course.id}
										selectedVideo={selectedVideo}
									/>

									<div className="course-video-list">
										<h4 className="title mb-3">
											{course && course.title}
										</h4>
										<ul>
											{videos.length > 0 &&
												videos.map((video) => (
													<VideoList
														key={video.id}
														{...video}
														onPlay={() =>
															selectVideo(
																video.id
															)
														}
														activeClass={active}
													/>
												))}
										</ul>
									</div>
								</div>
							</StickyBox>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Index;
