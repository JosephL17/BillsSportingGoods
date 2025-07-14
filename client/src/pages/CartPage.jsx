import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

function CartPage() {
    const { cartItems, cartTotal, removeFromCart} = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="container py-t text-center">
                <h1 className="mb-4">Your Cart</h1>
                <p>Your cart is empty.</p>
                <Link to="/products" className="btn btn-primary">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className='container py-5'>
            <h1 className="mb-4">Your Cart</h1>
            <div className='table-responsive'>
                <table className='table align-middle'>
                    <thead>
                        <tr>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => (
                            <tr key={item._id}>
                                <td>
                                    <div className='d-flex align-items-center'>
                                        <div>
                                            <Link to={`/product/${item.id}`} className='text-decoration-none'>
                                                {item["product name"]}
                                            </Link>
                                        </div>
                                    </div>
                                </td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>
                                    <button className='btn btn-sm btn-outline-danger' onClick={() => removeFromCart(item.id)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='row justify-content-end'>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Order Summary</h5>
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Subtotal:</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Shipping:</span>
                                    <span>Free</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mb-3 fw-bold">
                                    <span>Total:</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <button className="btn btn-primary w-100" onClick={() => navigate('/checkout')}>
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage;
