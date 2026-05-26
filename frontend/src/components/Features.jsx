import { Headphones, Shield, Truck } from "lucide-react";
import React from "react";

const Features = () => {
  return (
    <section className="py-12 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* free shipping */}
          <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="h-12 w-12 min-w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Truck className="h-6 w-6 text-blue-600" />
            </div>

            <div>
              <h3 className="font-semibold text-base sm:text-lg">
                Free Shipping
              </h3>

              <p className="text-muted-foreground text-sm sm:text-base">
                On orders over $50
              </p>
            </div>
          </div>

          {/* secure payment */}
          <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="h-12 w-12 min-w-12 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-green-600" />
            </div>

            <div>
              <h3 className="font-semibold text-base sm:text-lg">
                Secure Payment
              </h3>

              <p className="text-muted-foreground text-sm sm:text-base">
                100% secure transactions
              </p>
            </div>
          </div>

          {/* support */}
          <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="h-12 w-12 min-w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Headphones className="h-6 w-6 text-purple-600" />
            </div>

            <div>
              <h3 className="font-semibold text-base sm:text-lg">
                24/7 Support
              </h3>

              <p className="text-muted-foreground text-sm sm:text-base">
                Always here to help
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
