import "./App.css";
import Cart from "./containers/cart";
import Home from "./containers/home";

function App() {
	return (
		<div className='App'>
			<div className='col-8'>
				<Home />
			</div>
			<div className='col-4'>
				<Cart />
			</div>
		</div>
	);
}

export default App;
