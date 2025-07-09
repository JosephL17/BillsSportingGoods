import ProductCard from "../components/ProductCard";

function HomePage() {

    // Dummy data for featured products cards
    const featuredProducts = [
        { id: 1, name: "Product 1", price: 19.99 },
        { id: 2, name: "Product 2", price: 9.99 },
        { id: 3, name: "Product 3", price: 39.99 },
        { id: 4, name: "Product 4", price: 15.99 }
    ]

    return (
        <div className="container py-5">
            <section className="mb-5">
                <div className="jumbotron bg-light p-5 rounded">
                    <h1>Welcome to Bills Sporting Goods</h1>
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
        </div>
    )
}

export default HomePage