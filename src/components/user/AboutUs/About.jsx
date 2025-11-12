import { ArrowRight } from "lucide-react";
import React from "react";
import coffyWith from "../../../Images/iphoneblack.jpeg";


export default function About() {
  return (
    <div className="flex flex-col md:flex-row p-4 gap-6 max-w-6xl mx-auto">
      {/* Left section with text content */}
      <div className="flex-1 space-y-10">
        <div>
          <h1 className="text-4xl font-bold mb-8">About Us</h1>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">Why we stand Out</h2>
          <p className="text-gray-800">
            Maxtreo is the home of bold tech lovers. We exist to bridge people with stylish, performance-driven devices that shape the future. Our journey began with a simple belief: everyone deserves access to amazing technology that excites the soul and accelerates life.
          </p>
          
          <button className="flex items-center bg-black text-white rounded-full py-2 px-6 mt-6"
          onClick={() => window.location.href = '/team-neo'}
          >
            <span className="mr-2">Team NeoTokyo</span>
            <ArrowRight size={18} />
          </button>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">What We Offer</h2>
          <p className="text-gray-800">
            From pocket-perfect smartphones to productivity-boosting laptops and entertainment-packed tablets, Maxtreo brings together gadgets that matter. Every product is handpicked to ensure cutting-edge features, durable quality and head-turning design.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl font-bold"> Seamless Shopping Experience</h2>
          <p className="text-gray-800">
            From browsing to unboxing, we fine-tune every moment. Secure payments, quick delivery and easy returns make your tech-buying journey feel effortless.
          </p>
        </div>

        
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">Growing With You</h2>
          <p className="text-gray-800">
            New launches, hot deals and ever-expanding collections. Maxtreo evolves constantly, so you always stay ahead in the world of gadgets.
          </p>
        </div>
      </div>
      
      {/* Right section with the image */}
      <div className="flex-1">
        <div className="relative h-full w-full rounded-3xl overflow-hidden border border-gray-200">
          <div className="absolute inset-0 "></div>
          <div className="relative rounded-3xl overflow-hidden" style={{padding:"20px",border:"1.5px solid", background:"transparent"}}>
            <img 
                src={coffyWith} 
                alt="Person working on computer code" 
                className="object-cover w-full"
            />
            
          </div>
        </div>
      </div>
    </div>
  );
}