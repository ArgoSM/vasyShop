import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartProduct from "../../components/cartProduct";
import "./cart.css";

function Cart() {
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const payHandler = () => {
		dispatch({
			type: "PAY",
			payload: cart.products.map((k) => {
				return {
					name: k.name,
					img: k.img,
					price: k.price,
					quantity: k.quantity - k.ordered,
				};
			}),
		});
	};

	return (
		<div className='cart'>
			<h2>
				Cart<i className='fas fa-shopping-cart ml-2'></i>
			</h2>
			<h4 className='mt-2'>Products</h4>
			<div className='cart-prod-list'>
				{cart.products.map((product) => {
					return <CartProduct product={product} key={product.name} />;
				})}
			</div>
			<div className='subtotal'>
				<span className='subtotal-text'>Subtotal :</span>
				<span className='subtotal-val'>{"₹ " + cart.subtotal}</span>
			</div>
			<div className='pay' onClick={() => payHandler()}>
				<h4>Pay</h4>
				<span className='pay-val'>{"₹ " + cart.subtotal}</span>
			</div>
		</div>
	);
}

export default Cart;
