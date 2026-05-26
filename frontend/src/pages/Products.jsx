import FilterSidebar from "@/components/FilterSidebar";
import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productSlice";
import { Filter } from "lucide-react";

const Products = () => {
  const { products } = useSelector((store) => store.product);

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 999999]);
  const [sortOrder, setSortOrder] = useState("");

  // mobile sidebar
  const [showFilters, setShowFilters] = useState(false);

  const dispatch = useDispatch();

  const getAllProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/product/getAllProducts`,
      );

      if (res.data.success) {
        setAllProducts(res.data.products);
        dispatch(setProducts(res.data.products));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (allProducts.length === 0) return;

    let filtered = [...allProducts];

    if (search.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.productName?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (brand !== "All") {
      filtered = filtered.filter((p) => p.brand === brand);
    }

    filtered = filtered.filter(
      (p) => p.productPrice >= priceRange[0] && p.productPrice <= priceRange[1],
    );

    if (sortOrder === "lowtohigh") {
      filtered.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortOrder === "hightolow") {
      filtered.sort((a, b) => b.productPrice - a.productPrice);
    }

    dispatch(setProducts(filtered));
  }, [search, category, brand, sortOrder, priceRange, allProducts, dispatch]);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="pt-24 pb-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-7">
        {/* mobile filter button */}
        <div className="lg:hidden flex justify-between items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-md"
          >
            <Filter size={18} />
            Filters
          </button>

          {/* sort */}
          <Select onValueChange={(value) => setSortOrder(value)}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Sort by Price" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="lowtohigh">Price: Low to High</SelectItem>

                <SelectItem value="hightolow">Price: High to Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* sidebar */}
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } lg:block w-full lg:w-70`}
        >
          <FilterSidebar
            search={search}
            setSearch={setSearch}
            brand={brand}
            setBrand={setBrand}
            category={category}
            setCategory={setCategory}
            allProducts={allProducts}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </div>

        {/* products section */}
        <div className="flex flex-col flex-1">
          {/* desktop sort */}
          <div className="hidden lg:flex justify-end mb-10 relative z-50">
            <Select onValueChange={(value) => setSortOrder(value)}>
              <SelectTrigger className="w-52">
                <SelectValue placeholder="Sort by Price" />
              </SelectTrigger>

              <SelectContent
                side="bottom"
                sideOffset={2}
                position="popper"
                className="z-100"
              >
                <SelectGroup>
                  <SelectItem value="lowtohigh">Price: Low to High</SelectItem>

                  <SelectItem value="hightolow">Price: High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  loading={loading}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
