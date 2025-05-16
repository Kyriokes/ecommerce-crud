import React, {useEffect, useState} from "react";
import { getAllProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
};

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(()=> {
        getAllProducts().then(setProducts)
    }, []);


    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <h1 className="text-3xl font-bold text-blue-600">Productos</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Products;
