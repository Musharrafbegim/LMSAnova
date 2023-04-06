import React from "react";
import { useRouter } from "next/router";
import baseUrl from "@/utils/baseUrl";

const SocialShareBtns = () => {
	const router = useRouter();
	const { slug } = router.query;
	return (
		<div className="courses-share">
			<div className="share-info">
				<span>
					Share This Course <i className="flaticon-share"></i>
				</span>

				<ul className="social-link">
					<li>
						<a
							href={`https://facebook.com/sharer/sharer.php?u=${baseUrl}/${slug}`}
							className="d-block"
							target="_blank"
						>
							<i className="bx bxl-facebook"></i>
						</a>
					</li>
					<li>
						<a
							href={`https://twitter.com/intent/tweet?url=${baseUrl}/${slug}`}
							className="d-block"
							target="_blank"
						>
							<i className="bx bxl-twitter"></i>
						</a>
					</li>
					<li>
						<a
							href={`https://pinterest.com/pin/create/button/?url=${baseUrl}/${slug}`}
							className="d-block"
							target="_blank"
						>
							<i className="bx bxl-pinterest"></i>
						</a>
					</li>
					<li>
						<a
							href={`https://www.linkedin.com/shareArticle?mini=true&url=${baseUrl}/${slug}`}
							className="d-block"
							target="_blank"
						>
							<i className="bx bxl-linkedin"></i>
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SocialShareBtns;
