import { FC, useEffect, useState } from "react"
import products from './assets/products.json'
import bin from './assets/bin.png'
import pencil from './assets/pencil.png'
import add from './assets/add.png'
import minus from './assets/minus.png'
import { prepareNewState } from "./prepareNewState"
import { Observable, fromEvent } from "rxjs"
import { API_ORIGIN } from "./app-constants"
import axios from 'axios'

function debounce(func: Function, timeout = 300) {
    let timer: any;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func(args); }, timeout);
    };
}
const ProductTable: FC = () => {
    const [state, setState] = useState<{ productId: number, quantity: number }[]>([]);
    function addProduct(product: any) {
        const toChange = state.find(p => p.productId === product.productId) as { productId: number, quantity: number };
        if (!toChange) {
            const updated = [...state];
            updated.push({ productId: product.productId, quantity: 1 });
            setState(updated);
            return;
        }
        const stateChanger = (p: { productId: number, quantity: number }) => {
            const copy = { ...p }
            copy.quantity += 1
            return copy;
        }
        const newState = prepareNewState(state, toChange, stateChanger);
        setState(newState);
    }
    function minusProduct(product: any) {
        const toChange = state.find(p => p.productId === product.productId) as { productId: number, quantity: number }
        const stateChanger = (p: { productId: number, quantity: number }) => {
            const copy = { ...p }
            copy.quantity -= 1
            return copy;
        }
        const newState = prepareNewState(state, toChange, stateChanger);
        setState(newState);
    }

    function project(p: {
        productId: number;
        productName: string;
        price: number;
        productCode: string;
    }, i: number) {
        const quantity = state.find(p => p.productId === p.productId)?.quantity ?? 0;
        return (<tr key={i}>
            <td scope="col">{p.productId}</td>
            <td scope="col">{p.productName}</td>
            <td onClick={() => addProduct(p)} scope="col"><img src={add} /></td>
            <td scope="col">{quantity}</td>
            <td onClick={() => minusProduct(p)} scope="col"><img src={minus} /></td>
        </tr>)
    }
    const rows = products.map(project);
    function onSearchChange(e: any) {
        //const filtered = products.filter(p => p.productName.startsWith(e.target.value));
        console.log('e.target.value');
    }

    function submitOrder() {
        axios.post(API_ORIGIN + 'orders', state, { withCredentials: true })
    }

    const test = debounce(onSearchChange, 5000);
    //fromEvent(input, 'onchange')
    return (
        <div>
            <input onChange={test} className="form-control w-50" placeholder="Search" type="text" />
            <table className="table">

                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Add</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Minus</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>

            </table>
            <button onClick={submitOrder}>Ok</button>
        </div>

    )
}

export { ProductTable }