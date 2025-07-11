import { useState } from 'react';
import { Link } from 'react-router-dom';

function ProductRecommendations({ product }) {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const getRecommendations = async () => {
    if (!product) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('http://127.0.0.1:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: product }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.prediction && Array.isArray(result.prediction)) {
        setRecommendations(result.prediction);
        setShowRecommendations(true);
      } else {
        throw new Error('Invalid response format from prediction service');
      }
    } catch (err) {
      console.error('Error getting recommendations:', err);
      setError('Failed to get recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="similar-products mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>You Might Also Like</h3>
        {!showRecommendations && (
          <button 
            className="btn btn-primary" 
            onClick={getRecommendations}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Finding similar products...
              </>
            ) : (
              'Show Similar Products'
            )}
          </button>
        )}
      </div>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      {showRecommendations && (
        <div className="row">
          {recommendations.length === 0 ? (
            <div className="col-12">
              <p className="text-muted">No similar products found.</p>
            </div>
          ) : (
            recommendations.slice(0, 4).map((item, index) => (
              <div key={index} className="col-md-3 mb-4">
                <div className="card h-100">
                  {item.image && (
                    <img 
                      src={item.image} 
                      className="card-img-top" 
                      alt={item.name} 
                      style={{ height: '180px', objectFit: 'contain', padding: '10px' }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{item["product name"]}</h5>
                    <p className="card-text text-success fw-bold">
                      ${(item.price || 0).toFixed(2)}
                    </p>
                    <div className="d-flex justify-content-between small text-muted mb-2">
                      <span>Popularity: {item.popularity}/10</span>
                      <span>Durability: {item.durability}/10</span>
                    </div>
                  </div>
                  <div className="card-footer bg-white border-top-0">
                    <Link 
                      to={`/product/${item.sku}`} 
                      className="btn btn-sm btn-outline-primary w-100"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ProductRecommendations;