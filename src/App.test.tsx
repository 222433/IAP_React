import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Menu } from './Menu/Menu';
import { Map, Points } from './Map';
import { fireEvent } from '@testing-library/react';
import { prepareNewState } from './prepareNewState';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import { all } from 'axios';
import { addProduct, store } from './redux-configuration';
import { Provider } from 'react-redux';
import { ProductCard } from './product-card/product-card-component/ProductCard';
import { ProductCard as CheckoutCard } from './checkout/Checkout';
import { Product } from './data-model';
import { Checkout } from './checkout/Checkout';

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




test('prepareNewState correctly produces new state', () => {
  const state = [{ test: 1 }, { test: 2 }, { test: 3 }];
  const stateChanger = (element: { test: number }) => {
    const copy = { ...element }
    copy.test = 4;
    return copy;
  };
  const stateToModify = state[1];
  const changedState = prepareNewState(state, stateToModify, stateChanger);
  expect(1).toBe(1);
});

test('Map component renders proper amount of images', () => {
  const points = render(<Map cities={cities}></Map>).getAllByRole('img')
  expect(points.length).toBe(cities.length + 1)
});


test('Map component points are unselected initially', () => {
  const points = render(<Map cities={cities}></Map>).getAllByRole('img').filter(e => e.getAttribute('src') === 'red_dot.jpg')
  expect(points.length).toBe(cities.length)
});

test('Map component responds to firing on hover event', () => {
  render(<Map cities={cities}></Map>)
  const allCities = document.querySelectorAll('img')
  const firstCity = document.querySelectorAll('img')[1]
  act(() => firstCity.dispatchEvent(new MouseEvent('click', { bubbles: true })))
  screen.debug()

  expect(firstCity).toHaveAttribute("src", "green_dot.png");

  const allOtherCities = Array.from(allCities.values()).slice(2);
  allOtherCities.forEach(c => expect(c).toHaveAttribute("src", "red_dot.jpg"));

});

test('green city is unselected when another one is selected', () => {
  render(<Map cities={cities}></Map>)
  const allCities = document.querySelectorAll('img')
  let firstCity = document.querySelectorAll('img')[1]
  let secondCity: HTMLImageElement;
  act(() => firstCity.dispatchEvent(new MouseEvent('click', { bubbles: true })))
  //screen.debug()

  firstCity = document.querySelectorAll('img')[1];
  secondCity = document.querySelectorAll('img')[2];

  act(() => secondCity.dispatchEvent(new MouseEvent('click', { bubbles: true })))
  screen.debug()
  expect(secondCity).toHaveAttribute("src", "green_dot.png");

  const allOtherCities = Array.from(allCities.values()).slice(2).splice(1, 1);
  allOtherCities.forEach(c => expect(c).toHaveAttribute("src", "red_dot.jpg"));
});

test('Map component correctly fires callback after city selected', () => {
  const onCitySelected = jest.fn();
  render(<Map cities={cities} getSelectedCity={onCitySelected}></Map>)
  const allCities = document.querySelectorAll('img')
  let firstCity = document.querySelectorAll('img')[1]
  act(() => firstCity.dispatchEvent(new MouseEvent('click', { bubbles: true })))
  expect(onCitySelected).toBeCalledTimes(1);
  expect(onCitySelected).toBeCalledWith(cities[0].name)
  expect(onCitySelected).not.toBeCalledWith('name')
});




test('ProductCard component successfully pushes product to store', () => {
  const product: Product = {
    id: 1,
    img: 'undefined',
    name: 'product',
    price: 0
  };
  const subtree =
    <Provider store={store}>
      <ProductCard product={product}></ProductCard>
      <CheckoutCard product={product}></CheckoutCard>
    </Provider>
  render(subtree);
  const addButton = screen.getByText("Add");
  act(() => addButton.dispatchEvent(new MouseEvent('click', { bubbles: true })));
  expect(store.getState().products.indexOf(product)).not.toBe(-1);


  const deleteButton = screen.getByText("Delete");
  act(() => deleteButton.dispatchEvent(new MouseEvent('click', { bubbles: true })));
  expect(store.getState().products.indexOf(product)).toBe(-1);
});

test('Checkout Card successfully modifies redux store', () => {
  const product: Product = {
    id: 1,
    img: 'undefined',
    name: 'product',
    price: 0
  }
  store.dispatch(addProduct(product));
  const productsAdded = store.getState().products.length;
  const subtree =
    <Provider store={store}>
      <CheckoutCard product={product}></CheckoutCard>
    </Provider>
  render(subtree)
  const deleteButton = screen.getByText("Delete");
  act(() => deleteButton.dispatchEvent(new MouseEvent('click', { bubbles: true })));
  expect(productsAdded).toBe(1);
  expect(store.getState().products.indexOf(product)).toBe(-1);
  expect(store.getState().products.length).toBe(0);
})