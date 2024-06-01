import { FC, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import add from '../assets/add.png'
import minus from '../assets/minus.png'
import { Map } from "../Map"
import { Menu } from "../Menu/Menu"
import { Product } from "../data-model"
import { prepareNewState } from "../prepareNewState"
import { removeProduct } from "../redux-configuration"
interface City {
    x: number, y: number, name: string
}

interface CityPoint extends City {
    selected: boolean
}

const cities: City[] = [
    { x: 233, y: 139, name: 'City1' },
    { x: 101, y: 198, name: 'City2' },
    { x: 197, y: 240, name: 'City3' },
    { x: 156, y: 78, name: 'City4' },
    { x: 61, y: 102, name: 'City5' }
];

const Checkout: FC<{}> = () => {
    const products = useSelector<{ products: Product[] }, Product[]>(state => state.products);
    const [selectedCity, setSelectedCity] = useState('')
    const sendOrder = () => {
        console.log(products);
        console.log(selectedCity);
    }
    return (
        <div className='container'>
            <Menu></Menu>
            {products.map((p, i) => <ProductCard key={i} product={p}></ProductCard>)}
            <div className="row justify-content-md-center mb-5 mt-3">
                <div className="col-lg-6 shadow-sm ">
                    <Map cities={cities} getSelectedCity={setSelectedCity}></Map>
                </div>
            </div>
            <div>
                <button onClick={sendOrder} className="btn btn-warning">Order</button>
            </div>
        </div>
    );
}

export const ProductCard: FC<{ product: Product }> = ({ product }) => {
    const dispatch = useDispatch();
    const deleteItem = (p: Product) => {
        dispatch(removeProduct(p));
    }
    return (
        <div className="row justify-content-md-center mb-5 shadow-sm">
            <div className="col-lg-6 border border-primary rounded-top p-3" style={{ textAlign: 'left' }}>

                <img src="https://picsum.photos/100/80"></img>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit nam unde optio recusandae earum, dicta quos nisi saepe. Aperiam, atque!
                </div>
                <div className="text-center mt-2">
                    <button onClick={() => deleteItem(product)} type="button" className="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
    );
}
export { Checkout }