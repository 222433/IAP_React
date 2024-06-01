import { Map } from './Map';
import { Menu } from './Menu/Menu';
import { ProductCard } from './product-card/product-card-component/ProductCard';
import { ProductTable } from './ProductCell';
import { UserInfo } from './Menu/UserInfo/UserInfo';
import { ProductList } from './products-list/ProductList';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import { store } from './redux-configuration';
export function Home() {

    return (
        <div className='container'>
            <Menu></Menu>
            <ProductList products={[]}></ProductList>
        </div>
    );
}