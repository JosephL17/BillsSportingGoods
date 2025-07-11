import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryName } = useParams();
    const [error, setError] = useState(null);

    useEffect(() => {
        // TODO: Fetch products from our api

        const fetchProducts = async () => {
            try {
            setLoading(true);
            setError(null);

            const response = await fetch('http://localhost:3000/api/all_products');

            console.log('Response status:', response.status);

            if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

            const data = await response.json();
            const filteredProducts = categoryName
                    ? data.filter(p => {
                        // Convert database category to the same format as URL parameter
                        const formattedCategory = p.category.toLowerCase().replace(/\s+/g, '-');
                        // Compare with the URL parameter
                        return formattedCategory === categoryName;
                      })
                    : data;
            setProducts(filteredProducts);
            } catch (e) {
                console.error('Error fetching products:', e);
                setError('Failed to load products. Please try again later.');
             } finally {
                setLoading(false);
              }
        }
        
        fetchProducts();
        /*
        const filteredProducts = categoryName
                ? data.filter(p => p.category == categoryName) : data;

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
        */
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
                        <div key={product._id} className="col-6 col-md-4 col-lg-3">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProductsPage;