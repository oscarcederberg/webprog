import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.ES6';
import ComposeSalad from './ComposeSalad';
import { Component } from "react";
import ViewOrder from './ViewOrder';
import { Link, Route, Routes } from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      salads: []
    };
    
    this.handleSalad = this.handleSalad.bind(this);
  }
  
  handleSalad(salad){
    this.setState({
      salads: [...this.state.salads, salad]
    });
  }

  render(){
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
                <ComposeSalad inventory={inventory} handleSalad={this.handleSalad}/>
              </div>
            </div>
          } />

          <Route path="/view-order" element={
            <div className="continer col-12">
              <div className="row h-200 p-5 bg-light border rounded-3">
                <ViewOrder recieveSalads={() => {return this.state.salads}}/>
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
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="compose-salad">
          Compose a salad
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/view-order">
          View your order
        </Link>
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