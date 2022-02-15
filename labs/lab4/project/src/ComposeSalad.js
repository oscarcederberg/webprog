import {Component} from 'react';
import { Link } from 'react-router-dom';
import inventory from './inventory.ES6';
import Salad from './Salad';

/* Reflection question 1
 * The main difference I would say is states. With Classes they can be implemented very easily, while functions are a bit more complex (unless done with hooks). Classes also have constructors, which functions do not. Functions simply returns, and doesn't call render() like classees do.
 */

/* Reflection question 2
 * I suspect it is through using state hooks.
 */

/* Reflection question 2
 * I suspect that the prototype is kept, and not copied.
 */

function IngredientSelect({selectName, onChange, selections, text, selected}) {
    return (
        <>
            <select className="form-select form-select-lg" name={selectName} value={selected} onChange={onChange} required>
                <option value="">{text}</option>
                {
                    selections.map(name => 
                    <option key={name} value={name}>
                        {name}
                    </option>)
                }
            </select>
            <div className="invalid-feedback">
                Please select an item
            </div>
        </>
    );
}

class ComposeSalad extends Component {
    constructor(props){
        super(props);
        const inventory = this.props.inventory;
        this.handleSalad = this.props.handleSalad;
        this.navigate = this.props.navigate;

        this.foundations = Object.keys(inventory).filter(name => inventory[name].foundation);
        this.proteins = Object.keys(inventory).filter(name => inventory[name].protein);
        this.extras = Object.keys(inventory).filter(name => inventory[name].extra);
        this.dressings = Object.keys(inventory).filter(name => inventory[name].dressing);
        
        this.baseSet = {
            foundation: "",
            protein: "",
            extras: {},
            dressing: "",
        };
        
        this.state = this.baseSet;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        event.target.parentElement.classList.add("was-validated");

        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        if(target.type === "checkbox"){
            this.setState(state => ({
                extras: {...state.extras, [name]: value}
            }));
        }else{
            this.setState({
                [name]: value
            });
        }
    }

    handleSubmit(event){
        event.target.parentElement.classList.add("was-validated");
        
        if(event.target.checkValidity()){
            let salad = new Salad({});
            salad.add(this.state.foundation, inventory[this.state.foundation]);
            salad.add(this.state.protein, inventory[this.state.protein]);
            salad.add(this.state.dressing, inventory[this.state.dressing]);

            Object.keys(this.state.extras)
            .filter(extra => this.state.extras[extra])
            .forEach(extra => salad.add(extra, inventory[extra]));

            this.handleSalad(salad);
            this.navigate("/view-order");
        }
        
        event.preventDefault();
    }

    render(){
        return (
            <form className="row g-3" onSubmit={this.handleSubmit} noValidate>
                <div className="col-md-6">
                    <h1>Pick a foundation</h1>
                    <IngredientSelect selectName="foundation" onChange={this.handleChange} selections={this.foundations} text="Choose a foundation" selected={this.state.foundation} />
                </div>

                <div className="col-md-6">
                    <h1>Pick a protein</h1>
                    <IngredientSelect selectName="protein" onChange={this.handleChange} selections={this.proteins} text="Choose a protein" selected={this.state.protein} />
                </div>

                <h1>Pick extras</h1>
                {this.extras.map(name =>
                    <div className="form-check col-4" key={name}>
                        <input className="form-check-input" name={name} type="checkbox" checked={this.state.extras[name] || false} onChange={this.handleChange} id={name} />
                        <Link to={"/view-ingredient/" + name}>
                            {name}
                        </Link>
                    </div>
                )} 
                
                <div className="col-md-12">
                    <h1>Pick a dressing</h1>
                    <IngredientSelect selectName="dressing" onChange={this.handleChange} selections={this.dressings} text="Choose a dressing" selected={this.state.dressing} />
                </div>

                <div className="col-12">
                    <input className="btn btn-primary" type="submit" value="Submit" / >
                </div>
            </form>
        )
    }
}

export default ComposeSalad;