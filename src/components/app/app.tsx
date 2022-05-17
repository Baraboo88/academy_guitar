import React from 'react';
import Main from '../main/main';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import GuitarCardDetails from '../guitar-card-details/guitar-card-details';
import NotFound from '../not-found/not-found';


function App() {
  return (
    <BrowserRouter >
      <Switch>
        <Route exact path="/product/:id/:cat" component={GuitarCardDetails}/>
        <Route exact path="/product/:id" component={GuitarCardDetails}/>
        <Route exact path="/catalog/page/:id" component={Main}/>
        <Route exact path="/" component={Main}/>
        <Route component={NotFound}/>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
