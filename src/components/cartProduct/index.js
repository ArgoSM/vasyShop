import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./cartprod.css";

function CartProduct({ product }) {
	const [quantity, setQuantity] = useState(product.ordered);
	const dispatch = useDispatch();

	useEffect(() => {
		setQuantity(product.ordered);
	}, [product]);

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
		<div className='cart-prod'>
			<img src={product.img} className='cart-prod-img col'></img>
			<div className='col'>
				<div className='cart-prod-name'>{product.name}</div>
				<div className='cart-prod-price'>{"₹ " + product.price}</div>
			</div>
			<div className='cart-prod-add-clicked mt-2'>
				<i className='fas fa-minus mr-2' onClick={() => removeHandler()}></i>
				{quantity}
				<i
					className='fas fa-plus ml-2'
					onClick={() => (product.quantity > quantity ? addHandler() : null)}
				></i>
			</div>
			<div className='cart-prod-value col'>
				{"₹ " + product.price * product.ordered}
			</div>
		</div>
	);
}

export default CartProduct;
