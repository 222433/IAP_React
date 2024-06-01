import { FC } from "react"
import { Bubble } from "../../Bubble"
import coffee from '../../assets/products/kawa.jpg'
import { PriceBadge } from "../price-badge/PriceBadge"
import { AddProductButton } from "../add-to-card-button/AddProductButton"
import { UseDispatch, useDispatch, useSelector } from "react-redux"
import { state } from "@react-rxjs/core"
import { Product } from "../../data-model"
import { addProduct } from "../../redux-configuration"
const ProductCard: FC<{ product: Product }> = ({ product }) => {
    const c = coffee;
    const dispatch = useDispatch();

    const add = () => {
        dispatch(addProduct(product));


    }
    return (

        <div className="bg-gradient" style={{ display: 'inline-block', minWidth: '30%', border: '2px solid grey', borderRadius: '20px', boxShadow: '3px 5px', margin: '20px' }}>

            <p style={{ fontSize: '2em' }}>{product.name}</p>
            <div style={{ position: 'relative' }}>

                <div style={{ display: 'inline-block', position: 'relative' }}>
                    <PriceBadge></PriceBadge>
                    <img style={{ position: 'relative', width: '100%', }} src={product.img} alt="" />
                </div>


            </div>
            <div style={{ marginTop: '40px' }}></div>
            <button onClick={add} type="button" className="btn btn-primary">Add</button>
            <button type="button" className="btn btn-success">Info</button>
            <i className="bi bi-plus"></i>
            <div style={{ marginBottom: '40px' }}></div>

        </div>
    )
}

export { ProductCard }
