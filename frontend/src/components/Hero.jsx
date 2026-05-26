import React from "react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 pt-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* content */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-4">
              Latest Electronics at Best Prices
            </h1>

            <p className="text-base sm:text-lg md:text-xl mb-6 text-blue-100">
              Discover cutting-edge technology with unbeatable deals on
              smartphones, laptops and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 cursor-pointer w-full sm:w-auto">
                Shop Now
              </Button>

              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent cursor-pointer w-full sm:w-auto"
              >
                View Deals
              </Button>
            </div>
          </div>

          {/* image */}
          <div className="relative flex justify-center">
            <img
              src="/ekart-hero.png"
              alt="Hero"
              width={500}
              height={400}
              className="rounded-lg shadow-2xl w-full max-w-md md:max-w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
