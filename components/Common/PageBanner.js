import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const PageBanner = ({
	pageTitle,
	homePageUrl,
	homePageText,
	activePageText,
}) => {
	const variants = {
		hidden: {
			scale: 0.8,
			opacity: 0,
		},
		visible: {
			scale: 1,
			opacity: 1,
			transition: {
				delay: 0.2,
			},
		},
	};
	const pVariants = {
		hidden: {
			scale: 0.8,
			opacity: 0,
		},
		visible: {
			scale: 1,
			opacity: 1,
			transition: {
				delay: 0.4,
			},
		},
	};

	return (
		<>
			<div className="page-title-area">
				<div className="container">
					<div className="page-title-content">
						<motion.h2
							initial="hidden"
							animate="visible"
							variants={variants}
						>
							{pageTitle}
						</motion.h2>
						<motion.ul
							initial="hidden"
							animate="visible"
							variants={pVariants}
						>
							<li>
								<Link href={homePageUrl}>
									<a>{homePageText}</a>
								</Link>
							</li>
							<li className="active">{activePageText}</li>
						</motion.ul>
					</div>
				</div>

				<div className="shape9">
					<img src="/images/shape8.svg" alt="image" />
				</div>
			</div>
		</>
	);
};

export default PageBanner;
