import { FC, useState } from "react"
import { useEffect } from "react"
import { ProductCard } from "../product-card/product-card-component/ProductCard"
import { Product } from "../data-model";
const ProductList: FC<{ products?: any }> = ({ }) => {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        fetch('https://my.api.mockaroo.com/products.json?key=152a3340')
            .then(r => r.json())
            .then(res => res as Product[])
            .then(setProducts);

    }, []);
    return (
        <div className="container mt-5">
            {products.map(p => <ProductCard product={p}></ProductCard>)}

        </div>
    )
}

export { ProductList }