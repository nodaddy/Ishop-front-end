import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route, 
  Link,
  Switch
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';  //only thing to do after > 'npm install --save bootstrap'

import Admin from './Components/Admin';
import Home from './Components/Home';
import IShop from './Components/IShop';

function App() {
  return (
   <div>
     {/*navigation bar*/}
     <Router>
       <Switch>
         <Route exact path="/">
            <Home/>
         </Route>
         <Route exact path="/admin">
            <Admin/>
         </Route>
         <Route exact path="/ishop">
            <IShop/>
         </Route>
       </Switch>
     </Router>
   </div>
  );
}

export default App;
