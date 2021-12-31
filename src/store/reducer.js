import belt from "../assets/belt.jpg";
import bottle from "../assets/bottle.jpg";
import cap from "../assets/cap.jpg";
import hoodie from "../assets/hoodie.jpg";
import jacket from "../assets/jacket.jpg";
import pants from "../assets/pants.jpg";
import sweater from "../assets/sweater.jpg";
import tshirt from "../assets/tshirt.jpg";
import watch from "../assets/watch.jpg";

const products = [
	{ name: "Pants", img: pants, price: 1399, quantity: 435 },
	{ name: "Bottle", img: bottle, price: 40, quantity: 1000 },
	{ name: "Cap", img: cap, price: 499, quantity: 632 },
	{ name: "Hoodie", img: hoodie, price: 2499, quantity: 485 },
	{ name: "Watch", img: watch, price: 500, quantity: 601 },
	{ name: "Sweater", img: sweater, price: 1799, quantity: 22 },
	{ name: "Jacket", img: jacket, price: 2399, quantity: 1050 },
	{ name: "Belt", img: belt, price: 300, quantity: 355 },
	{ name: "T-shirt", img: tshirt, price: 599, quantity: 954 },
];

const cart = {
	products: [],
	subtotal: 0,
};

const initialState = { products: products, cart: cart };

function reducer(state = initialState, action) {
	switch (action.type) {
		case "ADD":
			let index = state.cart.products.findIndex(
				(k) => k.name === action.payload.product[0].name
			);
			return {
				products: [...state.products],
				cart: {
					products:
						index < 0
							? [...action.payload.product, ...state.cart.products]
							: state.cart.products.map((x) =>
									x.name === action.payload.product[0].name
										? { ...action.payload.product[0] }
										: x
							  ),
					subtotal: state.cart.subtotal + action.payload.amount,
				},
			};
		case "REMOVE":
			return {
				products: [...state.products],
				cart: {
					products:
						action.payload.product[0].ordered === 0
							? [
									...state.cart.products.filter(
										(k) => k.name != action.payload.product[0].name
									),
							  ]
							: state.cart.products.map((x) =>
									x.name === action.payload.product[0].name
										? { ...action.payload.product[0] }
										: x
							  ),
					subtotal: state.cart.subtotal - action.payload.amount,
				},
			};
		case "PAY":
			console.log(state.cart);
			fetch("https://janam.free.beeceptor.com/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(state.cart),
			}).then((response) => console.log(response.json()));
			let productList = [];
			for (let prod in state.products) {
				let index = action.payload.findIndex(
					(k) => k.name === state.products[prod].name
				);
				index < 0
					? productList.push(state.products[prod])
					: productList.push(action.payload[index]);
			}
			return {
				products: productList,
				cart: cart,
			};

		default:
			return state;
	}
}

export default reducer;
