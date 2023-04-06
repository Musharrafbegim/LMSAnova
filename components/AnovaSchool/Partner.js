import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";

const Partner = () => {
	const [partners, setPartners] = useState([]);

	useEffect(() => {
		const fetchPartners = async () => {
			const url = `${baseUrl}/api/partners`;
			const response = await axios.get(url);
			setPartners(response.data.partners);
		};
		fetchPartners();
	}, []);

	if (partners.length == 0) return;
	return (
		<>
			<div className="partner-area pt-100 pb-70 border-bottom">
				<div className="container">
					<Swiper
						slidesPerView={3}
						spaceBetween={30}
						breakpoints={{
							768: {
								slidesPerView: 4,
							},
							1024: {
								slidesPerView: 6,
							},
						}}
						className="mySwiper partner-slides"
					>
						{partners.length > 0 &&
							partners.map((partner) => (
								<SwiperSlide key={partner.id}>
									<motion.div
										className="single-partner-item"
										initial="hidden"
										whileInView="visible"
										transition={{
											type: "spring",
											duration: 3,
											bounce: 0.3,
										}}
										variants={{
											visible: { opacity: 1, scale: 1 },
											hidden: { opacity: 0, scale: 0 },
										}}
									>
										<img
											src={partner.partner_image}
											alt={partner.name}
										/>
									</motion.div>
								</SwiperSlide>
							))}
					</Swiper>
				</div>
			</div>
		</>
	);
};

export default Partner;
