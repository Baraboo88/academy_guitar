
import {  currentGuitarReducer as currentGuitar } from './current-guitar/current-guitar-reducer';
import {  guitarsReducer as guitars } from './guitars/guitars-reducer';
import {cartReducer as cart} from './cart/cart-reducer';
const rootReducer = {
  cart,
  guitars,
  currentGuitar,
};

export default rootReducer;
