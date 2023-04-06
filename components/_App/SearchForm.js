import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const SearchForm = () => {
	const [search, setSearch] = useState("");
	const router = useRouter();

	const handleSearch = (e) => {
		e.preventDefault();
		const query = router.query;
		router.push({
			pathname: "/courses",
			query: { ...query, search: search },
		});
	};
	return (
		<form className="search-box" onSubmit={handleSearch}>
			<input
				type="text"
				className="input-search"
				placeholder="Search Courses"
				name="search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button type="submit">
				<i className="flaticon-search"></i>
			</button>
		</form>
	);
};

export default SearchForm;
