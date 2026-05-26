import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const FilterSidebar = ({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  allProducts,
  priceRange,
  setPriceRange,
}) => {
  const Categories = allProducts.map((p) => p.category);
  const UniqueCategory = ["All", ...new Set(Categories)];

  const Brands = allProducts.map((p) => p.brand);
  const UniqueBrand = ["All", ...new Set(Brands)];

  const handleCategoryClick = (val) => {
    setCategory(val);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const handleMinChange = (e) => {
    const value = Number(e.target.value);

    if (value <= priceRange[1]) {
      setPriceRange([value, priceRange[1]]);
    }
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);

    if (value >= priceRange[0]) {
      setPriceRange([priceRange[0], value]);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPriceRange([0, 999999]);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md w-full lg:w-64 h-max">
      {/* Search */}
      <Input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white p-2 rounded-md border-gray-400 border w-full"
      />

      {/* Category */}
      <h1 className="mt-5 font-semibold text-lg md:text-xl">Category</h1>

      <div className="flex flex-col gap-2 mt-3 max-h-52 overflow-y-auto">
        {UniqueCategory.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="radio"
              checked={category === item}
              onChange={() => handleCategoryClick(item)}
            />

            <label className="text-sm md:text-base">{item}</label>
          </div>
        ))}
      </div>

      {/* Brand */}
      <h1 className="mt-5 font-semibold text-lg md:text-xl">Brand</h1>

      <select
        className="bg-white w-full p-2 border-gray-300 border rounded-md mt-2 text-sm md:text-base"
        value={brand}
        onChange={handleBrandChange}
      >
        {UniqueBrand.map((item, index) => (
          <option key={index} value={item}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Price Range */}
      <h1 className="mt-5 font-semibold text-lg md:text-xl mb-3">
        Price Range
      </h1>

      <div className="flex flex-col gap-3">
        <label className="text-sm md:text-base">
          ₹{priceRange[0]} - ₹{priceRange[1]}
        </label>

        {/* input fields */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            max="5000"
            value={priceRange[0]}
            onChange={handleMinChange}
            className="w-full p-2 border border-gray-300 rounded text-sm"
          />

          <span>-</span>

          <input
            type="number"
            min="0"
            max="999999"
            value={priceRange[1]}
            onChange={handleMaxChange}
            className="w-full p-2 border border-gray-300 rounded text-sm"
          />
        </div>

        {/* range sliders */}
        <input
          type="range"
          min="0"
          max="5000"
          step="100"
          className="w-full"
          value={priceRange[0]}
          onChange={handleMinChange}
        />

        <input
          type="range"
          min="0"
          max="999999"
          step="100"
          className="w-full"
          value={priceRange[1]}
          onChange={handleMaxChange}
        />
      </div>

      {/* Reset button */}
      <Button
        onClick={resetFilters}
        className="bg-pink-600 hover:bg-pink-700 text-white mt-6 cursor-pointer w-full"
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;
