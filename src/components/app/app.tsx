import React from 'react';
import Main from '../main/main';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import guitarCardDetails from '../guitar-card-details/guitar-card-details';


function App() {
  return (
    <BrowserRouter >
      <Switch>

        <Route exact path="/product/:id" component={guitarCardDetails}/>

        <Route exact path="/catalog/page/:id" component={Main}/>

        <Route exact path="/" component={Main}/>


      </Switch>
    </BrowserRouter>
  );
}

export default App;
