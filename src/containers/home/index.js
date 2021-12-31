import React, { useState, useEffect } from "react";
import Product from "../../components/product";
import { useSelector } from "react-redux";
import "./home.css";

function Home() {
	const [searchTerm, setSearchTerm] = useState("");
	const products = useSelector((state) => state.products);
	const [tableData, setTableData] = useState(products);

	useEffect(() => {
		setTableData(
			products.filter((k) => k.name.toLowerCase().startsWith(searchTerm))
		);
	}, [searchTerm]);

	useEffect(() => {
		setTableData(products);
	}, [products]);

	return (
		<div className='home'>
			<h2 className='pt-3 ml-2'>Products</h2>
			<div className='search ml-2'>
				<input
					className='search-bar'
					type='text'
					placeholder='Search by name'
					value={searchTerm}
					onChange={(e) => {
						e.preventDefault();
						setSearchTerm(e.target.value);
					}}
				></input>
			</div>
			<div className='productList mt-2'>
				{tableData.map((product) => {
					return <Product product={product} key={product.name} />;
				})}
			</div>
		</div>
	);
}

export default Home;
