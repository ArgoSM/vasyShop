import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./product.css";

function Product({ product }) {
	const cartProd = useSelector((state) => state.cart.products);
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(
		cartProd.filter((k) => k.name === product.name).length > 0
			? cartProd[0].ordered
			: 0
	);

	useEffect(() => {
		let item = cartProd.filter((k) => k.name === product.name);
		setQuantity(item.length > 0 ? item[0].ordered : 0);
	}, [cartProd]);

	const addHandler = () => {
		dispatch({
			type: "ADD",
			payload: {
				product: [{ ...product, ordered: quantity + 1 }],
				amount: product.price,
			},
		});
		setQuantity(quantity + 1);
	};

	const removeHandler = () => {
		dispatch({
			type: "REMOVE",
			payload: {
				product: [{ ...product, ordered: quantity - 1 }],
				amount: product.price,
			},
		});
		setQuantity(quantity - 1);
	};

	return (
		<div className='prod'>
			<img src={product.img} className='prod-img'></img>
			<div className='prod-text'>
				<h5>{product.name}</h5>
				<span className='price'>{"₹ " + product.price}</span>
				<span className='quantity'>In Stock: {product.quantity}</span>
				{quantity ? (
					<div className='add-clicked mt-2'>
						<i
							className='fas fa-minus mr-2'
							onClick={() => removeHandler()}
						></i>
						{quantity}
						<i
							className='fas fa-plus ml-2'
							onClick={() =>
								product.quantity > quantity ? addHandler() : null
							}
						></i>
					</div>
				) : (
					<div className='add mt-2' onClick={() => addHandler()}>
						<span>Add</span>
						<i className='fas fa-plus ml-2'></i>
					</div>
				)}
			</div>
		</div>
	);
}

export default Product;
