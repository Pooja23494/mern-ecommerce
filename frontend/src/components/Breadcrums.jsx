import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Breadcrums = ({ product }) => {
  return (
    <div className="overflow-x-auto">
      <Breadcrumb>
        <BreadcrumbList className="flex-nowrap text-sm sm:text-base">
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="whitespace-nowrap hover:text-pink-600"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink
              href="/products"
              className="whitespace-nowrap hover:text-pink-600"
            >
              Products
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage className="max-w-45 sm:max-w-xs truncate">
              {product.productName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Breadcrums;
