import React from 'react';
import { Link } from 'react-router-dom';
import laptop from "../../../Images/Gemini_Generated_laptop.png";
import smartphone from "../../../Images/Gemini_Generated_Image_smartphone.png";
import printer from "../../../Images/Gemini_Generated_Image_printer.png";
import tablet from "../../../Images/Gemini_Generated_Image_tablet.png";

function PopularCategory() {
  const categories = [
    { id: 1, name: 'Laptop', image: laptop },
    { id: 2, name: 'Mobile', image: smartphone },
    { id: 3, name: 'Tabs', image: tablet },
    { id: 4, name: 'Printer', image: printer },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '30px', 
        fontSize: '24px', 
        color: '#333',
        fontWeight: 'bold'
      }}>
        Popular Category
      </h2>
      <div className="popular-categories-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
      }}>
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/categoryproductlist?categoryId=${category.id}&categoryName=${encodeURIComponent(category.name)}`}
            className="category-link"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '10px',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img
              src={category.image}
              alt={category.name}
              style={{
                width: '100%',
                height: '150px', // Fixed height, but use contain to show fully
                objectFit: 'contain', // Changed to 'contain' to show image fully without cropping
                borderRadius: '4px',
              }}
            />
            <h3 style={{ marginTop: '10px', fontSize: '16px', textAlign: 'center' }}>
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularCategory;