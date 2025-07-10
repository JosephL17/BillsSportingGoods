import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryName } = useParams();

    useEffect(() => {
        // TODO: Fetch products from our api
        // for now it just uses the mock data

        setLoading(true);


        // this is where our API call should happen I believe
        setTimeout(() => {
            // mock products
            const mockProducts = [
                { id: 1, name: "Premium Duck Flippers", price: 29.99, category: "water-training-equipment" },
                { id: 2, name: "Aerodynamic Wing Trainers", price: 49.99, category: "flight-training-gear" },
            ]

            const filteredProducts = categoryName
                ? mockProducts.filter(p => p.category == categoryName) : mockProducts;

            setProducts(filteredProducts);
            setLoading(false);
        }, 500);
    }, [categoryName]);

    return (
        <div className="container py-5">
            <h1 className="mb-4">
                {categoryName
                    ? `${categoryName.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())}`
                    : 'All products'}
            </h1>
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row g-4">
                    {products.map(product => (
                        <div key={product.id} className="col-6 col-md-4 col-lg-3">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProductsPage;