import React, { useState, useEffect } from 'react';
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import { GiDuck, GiWaterSplash, GiFeather, GiTShirt, GiSoccerBall, GiMedicines, GiMuscleUp } from "react-icons/gi";
import { Link } from 'react-router-dom';

function HomePage() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Dummy data for featured products cards
    

    // Category data
    const categories = [
        { id: 1, name: "Water Training Equipment", icon: <GiWaterSplash size={48} />, color: "#2196F3" },
        { id: 2, name: "Flight Training Gear", icon: <GiFeather size={48} />, color: "#4CAF50" },
        { id: 3, name: "Duck Athletics Apparel", icon: <GiTShirt size={48} />, color: "#FF9800" },
        { id: 4, name: "Team Sports Equipment", icon: <GiSoccerBall size={48} />, color: "#f44336" },
        { id: 5, name: "Duck Nutrition and Recovery", icon: <GiMedicines size={48} />, color: "#9C27B0" },
        { id: 6, name: "Performance Enhancers", icon: <GiMuscleUp size={48} />, color: "#795548" },
    ]

    useEffect(() => {
        const fetchRandomProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('http://localhost:3000/api/products');

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                
                const randomProducts = getRandomProducts(data, 4);
                
                setFeaturedProducts(randomProducts);
            } catch (e) {
                console.error('Error fetching products:', e);
                setError('Failed to load featured products.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchRandomProducts();
    }, []);

    const getRandomProducts = (products, count) => {
        const shuffled = [...products];
        
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        return shuffled.slice(0, count);
    };


    return (
        <div className="container py-5">
            <section className="mb-5">
                <div className="jumbotron bg-light p-5 rounded">
                    <h1>Welcome to Bills Sporting Goods</h1>
                    <GiDuck size={64} className="me-2" style={{ color: "#2b7a0b" }} />
                </div>
            </section>
            <section className="mb-5">
                <h2 className="mb-4">Featured Products</h2>
                <div className="row">
                    {loading ? (
                        <div className="col-12 text-center">
                            <p>Loading featured products...</p>
                        </div>
                    ) : error ? (
                        <div className="col-12 text-center">
                            <p className="text-danger">{error}</p>
                        </div>
                    ) : (
                        featuredProducts.map(product => (
                            <div key={product.id || product._id} className="col-md-3 mb-4">
                                <ProductCard product={product} />
                            </div>
                        ))
                    )}
                </div>
            </section>
            <section className="mb-5">
                <h2 className="text-center mb-4">Shop by Category</h2>
                <div className="row g-4">
                    {categories.map(category => (
                        <div key={category.id} className="col-6 col-md-4 col-lg-2">
                            <CategoryCard category={category} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default HomePage