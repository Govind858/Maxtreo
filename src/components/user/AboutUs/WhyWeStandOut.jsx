import { ArrowUpRight } from "lucide-react";
import { FaStar } from "react-icons/fa";
import quality_img from "../../../Images/digitalproductshowcase.jpg";

export default function WhyWeStandOut() {
  // Hardcoded company rating data (in a real app, fetch from API or backend)
  const companyRatingSummary = {
    average_rating: 4.8,
    total_reviews: 1200
  };

  // Rating rendering logic (reusable, same as ProductsGrid)
  const renderCompanyRating = () => {
    const rating = parseFloat(companyRatingSummary.average_rating) || 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const totalReviews = companyRatingSummary.total_reviews || 0;

    return (
      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => {
          if (star <= fullStars) {
            return (
              <FaStar 
                key={star}
                className="text-[14px] lg:text-sm text-yellow-400 fill-current"
              />
            );
          } else if (star === fullStars + 1 && hasHalfStar) {
            return (
              <FaStar 
                key={star}
                className="text-[14px] lg:text-sm text-yellow-400 fill-current"
                style={{ clipPath: 'inset(0 50% 0 0)' }}
              />
            );
          } else {
            return (
              <FaStar 
                key={star}
                className="text-[14px] lg:text-sm text-gray-300"
              />
            );
          }
        })}
        <span className="text-sm lg:text-base ml-1 text-gray-600 font-medium">
          ({rating.toFixed(1)}){totalReviews > 0 && ` (${totalReviews.toLocaleString()} reviews)`}
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 lg:p-6 gap-6 max-w-6xl mx-auto bg-white">
      <div className="flex-1 space-y-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4 tracking-tight">
            About Us
          </h1>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-500">
            Why We Stand Out
          </h2>
          <p className="text-base text-black leading-relaxed max-w-lg">
            Maxtreo is the home of bold tech lovers. We exist to bridge people with stylish, performance-driven devices that shape the future. Our journey began with a simple belief: everyone deserves access to amazing technology that excites the soul and accelerates life.
          </p>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-500">
            What We Offer
          </h2>
          <p className="text-base text-black leading-relaxed max-w-lg">
            From pocket-perfect smartphones to productivity-boosting laptops and entertainment-packed tablets, Maxtreo brings together gadgets that matter. Every product is handpicked to ensure cutting-edge features, durable quality and head-turning design.
          </p>
          {/* Added Company Rating Section */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg lg:text-xl font-semibold text-black mb-2">
              Trusted by Thousands
            </h3>
            {renderCompanyRating()}
            <p className="text-sm text-gray-600">
              Join 1,200+ happy customers who've upgraded their tech with us.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 relative">
        <div className="relative h-[300px] lg:h-[400px] w-full rounded-2xl overflow-hidden border-2 border-blue-500 shadow-lg">
          <img 
            src={quality_img}
            alt="Futuristic tech tunnel with red and blue lights" 
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
          
          {/* Bottom right button */}
          <button className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors">
            Explore Now
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}