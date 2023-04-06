import React, { useEffect } from "react";
import Link from "@/utils/ActiveLink";
import { useSelector } from "react-redux";
import CartItems from "./CartItems";
import {
	calculateCartTotal,
	calculateCartTotalMinus,
} from "@/utils/calculateCartTotal";

const Cart = () => {
	const cartItems = useSelector((state) => state.cart.cartItems);
	const [cartAmout, setCartAmaount] = React.useState(0);
	const [cartAmoutMinus, setCartAmaountMinus] = React.useState(0);
	useEffect(() => {
		const { cartTotal } = calculateCartTotal(cartItems);
		const { cartTotalMinus } = calculateCartTotalMinus(cartItems);
		setCartAmaount(cartTotal);
		setCartAmaountMinus(cartTotalMinus);
	}, [cartItems]);
	return (
		<div className="option-item">
			<div className="cart-btn">
				<div className="dropdown">
					<Link href="/checkout">
						<a className="cart-link ptb-15">
							<i className="flaticon-shopping-cart"></i>{" "}
							<span>{cartItems.length}</span>
						</a>
					</Link>

					<ul className="dropdown-menu">
						{cartItems.length > 0 ? (
							cartItems.map((cart) => (
								<CartItems key={cart.id} {...cart} />
							))
						) : (
							<li className="empty">Empty</li>
						)}

						<li>
							<hr className="dropdown-divider" />
						</li>

						<li className="px-4 pb-2">
							<h5 className="pt-2 fw-bold">
								Total: ${cartAmout}{" "}
								<del className="fs-14 ms-1 text-muted">
									${cartAmoutMinus}
								</del>
							</h5>
							<Link href="/checkout">
								<a className="default-btn-style-3 d-block">
									Go to Checkout <span></span>
								</a>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Cart;
