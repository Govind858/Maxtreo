
export default function DirectionalSection() {
  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-6 bg-white">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left column - Text content */}
        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4 tracking-tight">
              Our Promise
            </h1>
            <p className="text-base text-black leading-relaxed max-w-lg">
              From door-step delivery to responsive support, we stay with you long after checkout. Maxtreo promises transparency, care and a feel-good journey from click to unboxing and beyond.
            </p>
          </div>
        </div>
        
        {/* Right column - Additional content or quote */}
        <div className="flex-1 bg-blue-50 rounded-2xl p-6 lg:p-8 border border-blue-200">
          <h3 className="text-2xl font-bold text-blue-500 mb-4">
            Your Tech Journey Starts Here
          </h3>
          <p className="text-base text-black leading-relaxed">
            We're committed to making every interaction exceptional. Join thousands of satisfied customers who trust Maxtreo for their next gadget upgrade.
          </p>
        </div>
      </div>
    </div>
  );
}