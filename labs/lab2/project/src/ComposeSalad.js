import {Component} from 'react';

/* Reflection question 1
 * The main difference I would say is states. With Classes they can be implemented very easily, while functions are a bit more complex (unless done with hooks). Classes also have constructors, which functions do not. Functions simply returns, and doesn't call render() like classees do.
 */

/* Reflection question 2
 * I suspect it is through using state hooks.
 */

function SaladSelect({text, selectName, onChange, selections}) {
    return (
        <label>
            <select className="form-select form-select-lg" name={selectName} onChange={onChange}>
                {selections.map(name => 
                    <option key={name} value={name}>
                        {name}
                    </option>)
                }
            </select>
        </label>
    );
}

class ComposeSalad extends Component {
    constructor(props){
        super(props);
        const inventory = this.props.inventory;

        this.foundations = Object.keys(inventory).filter(name => inventory[name].foundation);
        this.proteins = Object.keys(inventory).filter(name => inventory[name].protein);
        this.extras = Object.keys(inventory).filter(name => inventory[name].extra);
        this.dressings = Object.keys(inventory).filter(name => inventory[name].dressing);
        
        this.state = {
            foundation: this.foundations[0],
            protein: this.proteins[0],
            extra: this.extras[0],
            dressing: this.dressings[0]
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render(){
        return (
            <div className="continer col-12">
                <div className="row h-200 p-5 bg-light border rounded-3">
                    <form className="container">
                        <h1>Pick a foundation</h1>
                        <SaladSelect selectName="foundation" onChange={this.handleChange} selections={this.foundations} />

                        <h1>Pick a protein</h1>
                        <SaladSelect selectName="protein" onChange={this.handleChange} selections={this.proteins} />

                        <h1>Pick extras</h1>
                        {this.extras.map(name =>
                            <div className="form-check col-4">
                                <input className="form-check-input" name={name} type="checkbox" checked={this.state[name] || false} onChange={this.handleChange}/>
                                <label className="form-check-label">{name}</label>
                            </div>
                        )} 
                        
                        <h1>Pick a dressing</h1>
                        <SaladSelect selectName="dressing" onChange={this.handleChange} selections={this.dressings} />
                    </form>
                </div>
            </div>
        )
    }
}

export default ComposeSalad;