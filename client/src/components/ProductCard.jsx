function ProductCard({ product }) {

    // PLACEHOLDER DATA UNTIL WE CONNECT TO BACKEND
    const demoProduct = product || {
        id: 1,
        name: "Sample Product",
        price: 19.99
    }

    return (
        <div className="card-body d-flex flex-column">
            <h5 className="card-title">{demoProduct.name}</h5>
            <p className="card=text text-muted">${demoProduct.price.toFixed(2)}</p>
            <div className="mt-auto">
                <button className="btn btn-outline-primary me-2">
                    View Details
                </button>
                <button className="btn btn-primary">
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard