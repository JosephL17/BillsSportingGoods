import { Link } from 'react-router-dom';

function CategoryCard({ category }) {
  return (
    <Link 
      to={`/products/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} 
      className="text-decoration-none"
    >
      <div className="card h-100 border-0 shadow-sm category-card">
        <div className="card-body text-center">
          <div 
            className="category-icon-wrapper mb-3 mx-auto d-flex align-items-center justify-content-center rounded-circle" 
            style={{ 
              backgroundColor: `${category.color}20`, 
              width: '80px', 
              height: '80px' 
            }}
          >
            <div style={{ color: category.color }}>
              {category.icon}
            </div>
          </div>
          <h5 className="card-title">{category.name}</h5>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;