import React from "react";

const ProductCard: React.FC<{
    product: { name: string; price: number; description: string };
}> = ({ product }) => {
    return (
        <div className="p-4 bg-white shadow rounded">
            <div className="text-lg font-semibold">${product.name}</div>
            <div className="text-md text-green-600">${product.price}</div>
            <div className="text-sm text-gray-600">${product.description}</div>
        </div>
    );
};

export default ProductCard;
