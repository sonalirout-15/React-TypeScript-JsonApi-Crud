import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import AddCustomer from './Component/AddCustomer';
import CustomerList from './Component/CustomerList';
import EditCustomer from './Component/EditCustomer';

function App() {
  return (
    <div className="App">
          <Route exact path='/' component={CustomerList}/>
          <Route exact path='/addCustomer' component={AddCustomer}/>
          <Route exact path='/editCustomer/:id' component={EditCustomer}/>
    </div>
  );
}

export default App;
