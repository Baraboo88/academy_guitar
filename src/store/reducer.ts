
import {  currentGuitarReducer as currentGuitar } from './current-guitar/current-guitar-reducer';
import {  guitarsReducer as guitars } from './guitars/guitars-reducer';
const rootReducer = {
  guitars,
  currentGuitar,
};

export default rootReducer;
