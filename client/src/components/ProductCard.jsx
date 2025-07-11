import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
    const { addToCart, isInCart, removeFromCart } = useCart();
    const navigate = useNavigate();

    // PLACEHOLDER DATA UNTIL WE CONNECT TO BACKEND
    const demoProduct = product || {
        id: 1,
        name: "Sample Product",
        price: 19.99
    }

    const handleAddToCart = () => {
        addToCart(demoProduct);
    };

    const handleRemoveFromCart = () => {
        removeFromCart(demoProduct.id);
    };

    const handleViewDetails = () => {
        navigate(`/product/${demoProduct.sku}`);
    };

    return (
        <div className='card' style={{ border: '1px solid #dee2e6' }}>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{demoProduct["product name"]}</h5>
                <p className="card=text text-muted">${demoProduct.price.toFixed(2)}</p>
                <p className="card-text"><small className="text-muted">Description: {demoProduct.description}</small></p>
                <p className="card-text"><small className="text-muted">Category: {demoProduct.category}</small></p>
                <div className="mt-auto">
                    <button className="btn btn-outline-primary me-2" onClick={handleViewDetails}>
                        View Details
                    </button>
                    <button className="btn btn-primary" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard