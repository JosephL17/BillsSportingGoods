import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetailsPage() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { productId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            // Mock product data
            const mockProduct = {
              id: productId,
              name: "Premium Duck Flippers",
              price: 29.99,
              description: "High-performance flippers designed for competitive duck athletes.",
              category: "water-training-equipment",
            };
            
            setProduct(mockProduct);
            setLoading(false);
          }, 500);
    }, [productId]);

    const handleAddToCart = () => {
        // TODO: cart functionality
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
                    <h1 className="mb-3">{product.name}</h1>
                    <p className="fs-4 fw-bold text-primary mb-3">${product.price.toFixed(2)}</p>
                    <p className="mb-4">{product.description}</p>
                    <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsPage;