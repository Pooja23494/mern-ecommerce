import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { X } from "lucide-react";

const ImageUpload = ({ productData, setProductData }) => {
  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length) {
      setProductData((prev) => ({
        ...prev,
        productImg: [...prev.productImg, ...files],
      }));
    }
  };

  const removeImage = (index) => {
    setProductData((prev) => {
      const updatedImages = prev.productImg.filter((_, i) => i !== index);

      return {
        ...prev,
        productImg: updatedImages,
      };
    });
  };

  return (
    <div className="grid gap-3 w-full">
      {/* label */}
      <Label className="text-sm sm:text-base font-medium">Product Images</Label>

      {/* hidden input */}
      <Input
        type="file"
        id="file-upload"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFiles}
      />

      {/* upload button */}
      <Button variant="outline" className="w-full sm:w-max cursor-pointer">
        <label htmlFor="file-upload" className="cursor-pointer w-full">
          Upload Images
        </label>
      </Button>

      {/* image preview */}
      {productData.productImg.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
          {productData.productImg.map((file, index) => {
            let preview;

            // file preview
            if (file instanceof File) {
              preview = URL.createObjectURL(file);
            } else if (typeof file === "string") {
              preview = file;
            } else if (file?.url) {
              preview = file.url;
            } else {
              return null;
            }

            return (
              <Card
                key={index}
                className="relative group overflow-hidden rounded-xl shadow-sm"
              >
                <CardContent className="p-2">
                  {/* image */}
                  <img
                    src={preview}
                    alt="product"
                    className="w-full h-28 sm:h-32 md:h-36 object-cover rounded-lg"
                  />

                  {/* remove button */}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 
                    transition"
                  >
                    <X size={14} />
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
