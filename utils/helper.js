export const alreadyFav = (userFavs, courseId) => {
	userFavs.find((crId) => {
		return crId.courseId == courseId;
	});
};

export const secondsToHms = (d) => {
	d = Number(d);
	let h = Math.floor(d / 3600);
	let m = Math.floor((d % 3600) / 60);
	let s = Math.floor((d % 3600) % 60);

	let hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
	let mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
	let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
	return hDisplay + mDisplay + sDisplay;
};

export const progress = (finished, total) => {
	return Math.round((finished / total) * 100);
};

export const formatDate = (date) => {
	return new Date(date).toLocaleDateString("en-US");
};

export const calculateDiscount = (discount, listPrice) => {
	let beforeDiscount = parseFloat(parseFloat(listPrice).toFixed(2));
	let discountAmount = parseFloat(
		((beforeDiscount * discount) / 100).toFixed(2)
	);
	let afterDiscount = beforeDiscount - discountAmount;
	// return { afterDiscount, beforeDiscount, discountAmount, discount };
	return afterDiscount.toFixed(2);
};
