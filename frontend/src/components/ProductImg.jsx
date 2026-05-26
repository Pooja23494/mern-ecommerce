import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductImg = ({ images }) => {
  const [mainImg, setMainImg] = useState(images[0]?.url);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-5 w-full">
      {/* thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
        {images.map((img, index) => {
          return (
            <img
              key={index}
              onClick={() => setMainImg(img.url)}
              src={img.url}
              alt="product"
              className={`cursor-pointer w-16 h-16 sm:w-20 sm:h-20 object-cover border rounded-md shadow-md transition-all duration-200 ${
                mainImg === img.url ? "border-pink-600" : "border-gray-300"
              }`}
            />
          );
        })}
      </div>

      {/* main image */}
      <div className="w-full flex justify-center">
        <Zoom>
          <img
            src={mainImg}
            alt="main-product"
            className="w-full max-w-md lg:max-w-xl border rounded-lg shadow-lg object-cover"
          />
        </Zoom>
      </div>
    </div>
  );
};

export default ProductImg;
