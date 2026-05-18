import {
  Sparkles,
  ShieldCheck,
  Palette,
} from "lucide-react";

const TrustPreview = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-6">
          Why Choose <span className="text-emerald-600">PlantFashion</span>
        </h2>

        {/* Intro text */}
        <p className="text-center text-gray-500 max-w-2xl mx-auto mb-16">
          We craft unforgettable event experiences through elegant décor,
          creative concepts, and flawless execution.
        </p>

        {/* Trust items */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-14 text-center">

          {/* Item 1 */}
          <div className="flex flex-col items-center">
            <Sparkles className="w-12 h-12 text-gray-500 mb-5" />

            <h3 className="text-lg font-semibold mb-2">
              Premium Décor Quality
            </h3>

            <p className="text-sm text-gray-500 max-w-xs">
              From luxury floral arrangements to elegant stage setups,
              we use only high-quality décor elements for every event.
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-12 h-12 text-gray-500 mb-5" />

            <h3 className="text-lg font-semibold mb-2">
              Stress-Free Execution
            </h3>

            <p className="text-sm text-gray-500 max-w-xs">
              Our experienced team manages everything from planning
              to execution, so you can enjoy your event worry-free.
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center">
            <Palette className="w-12 h-12 text-gray-500 mb-5" />

            <h3 className="text-lg font-semibold mb-2">
              Customized Event Themes
            </h3>

            <p className="text-sm text-gray-500 max-w-xs">
              Every event is uniquely designed to match your theme,
              vision, and celebration style.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustPreview;
