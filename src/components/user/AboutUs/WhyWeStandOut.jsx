import { ArrowUpRight } from "lucide-react";
import quality_img from "../../../Images/digitalproductshowcase.jpg";

export default function WhyWeStandOut() {
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
       
        </div>
      </div>
    </div>
  );
}