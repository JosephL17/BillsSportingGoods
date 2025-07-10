import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import { GiDuck, GiWaterSplash, GiFeather, GiTShirt, GiSoccerBall, GiMedicines, GiMuscleUp } from "react-icons/gi";
import { Link } from 'react-router-dom';

function HomePage() {

    // Dummy data for featured products cards
    const featuredProducts = [
        { id: 1, name: "Product 1", price: 19.99 },
        { id: 2, name: "Product 2", price: 9.99 },
        { id: 3, name: "Product 3", price: 39.99 },
        { id: 4, name: "Product 4", price: 15.99 }
    ]

    // Category data
    const categories = [
        { id: 1, name: "Water Training Equipment", icon: <GiWaterSplash size={48} />, color: "#2196F3" },
        { id: 2, name: "Flight Training Gear", icon: <GiFeather size={48} />, color: "#4CAF50" },
        { id: 3, name: "Duck Athletics Apparel", icon: <GiTShirt size={48} />, color: "#FF9800" },
        { id: 4, name: "Team Sports Equipment", icon: <GiSoccerBall size={48} />, color: "#f44336" },
        { id: 5, name: "Duck Nutrition and Recovery", icon: <GiMedicines size={48} />, color: "#9C27B0" },
        { id: 6, name: "Performance Enhancers", icon: <GiMuscleUp size={48} />, color: "#795548" },
    ]

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
                    {featuredProducts.map(product => (
                        <div key={product.id} className="col-md-3 mb-4">
                            <ProductCard product={product} />
                        </div>
                    ))}
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