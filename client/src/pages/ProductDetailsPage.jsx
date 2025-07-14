import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from '../contexts/CartContext';
import ProductRecommendations from "../components/ProductRecommendations";

function ProductDetailsPage() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { productId } = useParams();
    const navigate = useNavigate();
    const { addToCart, isInCart, removeFromCart } = useCart();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`http://localhost:3000/api/products/${productId}`);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setProduct(data);
            } catch (e) {
                console.error('Error fetching product details:', e);
                setError('Failed to load product details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchProductDetails();
    }, [productId]);

    const handleAddToCart = () => {
        addToCart(product);
    }

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-6">
                    <h1 className="mb-3">{product["product name"]}</h1>
                    <p className="fs-4 fw-bold text-primary mb-3">${product.price.toFixed(2)}</p>
                    <p className="mb-4">{product.description}</p>
                    <p className="mb-3"><strong>Category:</strong> {product.category}</p>
                    <p className="mb-3"><strong>SKU:</strong> {product.sku}</p>
                    <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
            <ProductRecommendations product={product} />
        </div>
    );
}

export default ProductDetailsPage;