import { GiDuck } from "react-icons/gi"
import { Link } from 'react-router-dom'
import { useState } from "react"

function Navbar() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        // TODO: IMPLEMENT SEARCH FUNCTIONALITY
        console.log("Searching for:", searchQuery);
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
                    <form className="d-flex mx-auto" onSubmit={handleSearch}>
                        <div className="input-group">
                            <input 
                                type="search" 
                                className="form-control" 
                                placeholder="Search products..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </div>
                    </form>
                    <div className="d-flex">
                    <Link to="/cart" className="btn btn-outline-primary">
                        Cart <span className="badge bg-primary">0</span>
                    </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar