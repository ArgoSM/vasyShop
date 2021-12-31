import React, { useState, useEffect } from "react";
import Product from "../../components/product";
import { useSelector } from "react-redux";
import "./home.css";

function Home() {
	const [searchTerm, setSearchTerm] = useState("");
	const products = useSelector((state) => state.products);

	useEffect(() => {
		console.log(searchTerm);
	}, [searchTerm]);

	return (
		<div className='container-fluid home'>
			<h2 className='mt-3 ml-2'>Products</h2>
			<div className='search'>
				<input
					type='text'
					placeholder='Search by name'
					value={searchTerm}
					onChange={(e) => {
						e.preventDefault();
						setSearchTerm(e.target.value);
					}}
				></input>
			</div>
			<div className='productList'>
				{products.map((product) => {
					return <Product product={product} key={product.name} />;
				})}
			</div>
		</div>
	);
}

export default Home;
