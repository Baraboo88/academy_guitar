import React from 'react';
import Main from '../main/main';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter >
      <Switch>
        <Route exact path="/catalog/page/:id" component={Main}/>
        <Route>
          <Route component={Main}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
