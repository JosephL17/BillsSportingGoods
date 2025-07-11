import { GiDuck } from "react-icons/gi"
import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from "react"
import { useCart } from '../contexts/CartContext';


function Navbar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const { cartCount } = useCart();
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        // TODO: IMPLEMENT SEARCH FUNCTIONALITY
        console.log("Searching for:", searchQuery);
    };

    const handleSearchInputChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        
        if (query.trim().length < 2) {
            setSearchResults([]);
            setShowDropdown(false);
            return;
        }
        
        try {
            setIsSearching(true);
            
            const response = await fetch('http://localhost:3000/api/products/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ searchTerm: query })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const results = await response.json();
            setSearchResults(results);
            setShowDropdown(true);
            
        } catch (error) {
            console.error('Error searching products:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand d-flex align-items-center" href="/">
                    <GiDuck size={32} className="me-2" style={{ color: "#2b7a0b" }} />
                    Bills Sporting Goods
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto" id="navbarNav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>
                    </ul>
                    <div className="d-flex mx-auto position-relative" ref={dropdownRef}>
                        <form className="d-flex" onSubmit={handleSearch}>
                            <div className="input-group">
                                <input 
                                    type="search" 
                                    className="form-control" 
                                    placeholder="Search products..." 
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                    aria-label="Search"
                                />
                                <button 
                                    className="btn btn-outline-success" 
                                    type="submit"
                                    disabled={isSearching}
                                >
                                    {isSearching ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        'Search'
                                    )}
                                </button>
                            </div>
                        </form>
                        
                        {/* Dropdown search results */}
                        {showDropdown && searchResults.length > 0 && (
                            <div className="position-absolute top-100 start-0 mt-1 w-100 bg-white border rounded shadow-sm z-3">
                                <div className="p-2">
                                    <h6 className="text-muted mb-2">Search Results</h6>
                                    {searchResults.slice(0, 5).map(product => (
                                        <Link 
                                            key={product._id || product.id} 
                                            to={`/product/${product.sku}`}
                                            className="text-decoration-none"
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            <div className="d-flex align-items-center p-2 border-bottom hover-bg-light">
                                                <div>
                                                    <div className="text-dark">{product["product name"] || product.name}</div>
                                                    <div className="small text-success">${product.price.toFixed(2)}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                    
                                    {searchResults.length > 5 && (
                                        <div className="text-center mt-2">
                                            <small className="text-muted">
                                                {searchResults.length - 5} more results...
                                            </small>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        
                        {showDropdown && searchQuery.trim().length >= 2 && searchResults.length === 0 && !isSearching && (
                            <div className="position-absolute top-100 start-0 mt-1 w-100 bg-white border rounded shadow-sm z-3">
                                <div className="p-3 text-center text-muted">
                                    No products found matching "{searchQuery}"
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="d-flex">
                        <Link to="/cart" className="btn btn-outline-primary">
                            Cart <span className="badge bg-primary">{cartCount}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar