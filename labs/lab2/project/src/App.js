import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.ES6';
import ComposeSalad from './ComposeSalad';
import { Component } from "react";
import ViewOrder from './ViewOrder';

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
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>

      <div className="continer col-12">
        <div className="row h-200 p-5 bg-light border rounded-3">
          <ComposeSalad inventory={inventory} handleSalad={this.handleSalad}/>
        </div>
      </div>

      <div className="continer col-12">
        <div className="row h-200 p-5 bg-light border rounded-3">
          <ViewOrder recieveSalads={() => {return this.state.salads}}/>
        </div>
      </div>

      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
    );
  }
}

export default App;