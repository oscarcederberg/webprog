import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Component } from "react";
import ViewOrder from './ViewOrder';
import { NavLink, Route, Routes } from 'react-router-dom';
import ComposeSaladWrapper from './ComposeSaladWrapper';
import ViewIngredient from './ViewIngredient';
import inventory from './inventory.ES6';
import Salad from './Salad';

function safeFetch(url){
  return fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('${url} returned status ${response.status}');
    }
    return response.json();
  });
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inventory: {},
      salads: []
    };
    
    this.handleSalad = this.handleSalad.bind(this);
    this.fetchInventory = this.fetchInventory.bind(this);
  }

  componentDidMount() {
    let inventory = this.fetchInventory();
    let salads = JSON.parse(window.localStorage.getItem("salads"))
    .map(salad => {
      return new Salad(salad.ingredients);
    });

    this.setState({
      inventory: inventory,
      salads: salads
    });
  }

  fetchInventory() {
    const url = 'http://localhost:8080/'
    let inventory = {};

    const foundationsResponse = safeFetch(url + 'foundations/')
    .then(base =>
      Promise.all(
      Object.values(base).map(name => {
        return safeFetch(url + 'foundations/' + name)
        .then(resp => inventory[name] = resp);
      }))
    );

    const proteinsResponse = safeFetch(url + 'proteins/')
    .then(base =>
      Promise.all(
      Object.values(base).map(name => {
        return safeFetch(url + 'proteins/' + name)
        .then(resp => inventory[name] = resp);
      }))
    );

    const extrasResponse = safeFetch(url + 'extras/')
    .then(base =>
      Promise.all(
      Object.values(base).map(name => {
        return safeFetch(url + 'extras/' + name)
        .then(resp => inventory[name] = resp);
      }))
    );

    const dressingsResponse = safeFetch(url + 'dressings/')
    .then(base =>
      Promise.all(
      Object.values(base).map(name => {
        return safeFetch(url + 'dressings/' + name)
        .then(resp => inventory[name] = resp);
      }))
    );

    Promise.all([foundationsResponse, proteinsResponse, extrasResponse, dressingsResponse]);
    
    return inventory;
  }
  
  handleSalad(salad) {
    let salads = [...this.state.salads, salad]; 
    this.setState(state => ({
      salads: salads
    }));

    window.localStorage.setItem("salads", JSON.stringify(salads))
  }

  render() {
    return (
      <div className="container py-4">
        <Header />
        <Navbar />
        {this.renderRouter()}
        <Footer />
      </div>
    );
  }

  renderRouter(){
    return (
        <Routes>
          <Route path="/" element={this.renderPageContent()} />

          <Route path="/compose-salad" element={
            <div className="continer col-12">
              <div className="row h-200 p-5 bg-light border rounded-3">
                <ComposeSaladWrapper inventory={this.state.inventory} handleSalad={this.handleSalad}/>
              </div>
            </div>
          } />

          <Route path="/view-order" element={
            <div className="continer col-12">
              <div className="row h-200 p-5 bg-light border rounded-3">
                <ViewOrder recieveSalads={this.state.salads}/>
              </div>
            </div>
          } />

          <Route path="/view-ingredient/:name" element={
            <div className="continer col-12">
              <div className="row h-200 p-5 bg-light border rounded-3">
                <ViewIngredient inventory={this.state.inventory} />
              </div>
            </div>
          } />

          <Route path="*" element={
            <div>
              <h2>404</h2>
              <h3>Page not found</h3>
            </div>
          } />
        </Routes>
    )
  }

  renderPageContent(){
    return (
      <h2>Welcome!</h2>
    )
  }
}

function Header() {
  return (
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">My own saladbar</span>
    </header>
  )
}

function Navbar() {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-items">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="compose-salad">
          Compose a salad
        </NavLink>
      </li>
      <li>
        <NavLink className="nav-link" to="/view-order">
          View your order
        </NavLink>
      </li>
    </ul>
  )
}

function Footer(){
  return (
    <footer className="pt-3 mt-4 text-muted border-top">
      EDAF90 - webprogrammering
    </footer>
  )
}

export default App;