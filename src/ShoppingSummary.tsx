import { FC } from "react"
import { useSelector } from "react-redux"
import { Product } from "./data-model";
import checkout from './assets/checkout.jpg'
import { Link } from "react-router-dom";
const ShoppingSummary: FC<{}> = () => {
    const products = useSelector<{ products: Product[] }, Product[]>(state => state.products);
    return (
        <Link to="/checkout" className="nav-link position-relative">
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">{products.length}<span className="visually-hidden">unread messages</span></span>
            <img width={24} height={24} src={checkout}></img>
        </Link>

    )
}

export { ShoppingSummary }