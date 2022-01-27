import {Component} from 'react';

/* Reflection question 1
 * The main difference I would say is states. With Classes they can be implemented very easily, while functions are a bit more complex (unless done with hooks). Classes also have constructors, which functions do not. Functions simply returns, and doesn't call render() like classees do.
 */

/* Reflection question 2
 * I suspect it is through using state hooks.
 */

/* Reflection question 2
 * I suspect that the prototype is kept, and not copied.
 */

function SaladSelect({selectName, onChange, selections, selected}) {
    return (
        <select className="form-select form-select-lg" name={selectName} value={selected} onChange={onChange}>{
            selections.map(name => 
                <option key={name} value={name}>
                    {name}
                </option>)
            }
        </select>
    );
}

class ComposeSalad extends Component {
    constructor(props){
        super(props);
        const inventory = this.props.inventory;
        this.handleSalad = this.props.handleSalad;

        this.foundations = Object.keys(inventory).filter(name => inventory[name].foundation);
        this.proteins = Object.keys(inventory).filter(name => inventory[name].protein);
        this.extras = Object.keys(inventory).filter(name => inventory[name].extra);
        this.dressings = Object.keys(inventory).filter(name => inventory[name].dressing);
        
        this.baseSet = {
            foundation: this.foundations[0],
            protein: this.proteins[0],
            extras: {},
            dressing: this.dressings[0],
        };
        
        this.state = this.baseSet;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        if(target.type === "checkbox"){
            this.setState({
                extras: {...this.state.extras, [name]: value}
            });
        }else{
            this.setState({
                [name]: value
            });
        }
    }

    handleSubmit(event){
        this.handleSalad({...this.state});
        this.setState(this.baseSet);
        event.preventDefault();
    }

    render(){
        return (
            <form className="row g-3" onSubmit={this.handleSubmit}>
                <div className="col-md-6">
                    <h1>Pick a foundation</h1>
                    <SaladSelect selectName="foundation" onChange={this.handleChange} selections={this.foundations} selected={this.state.foundation} />
                </div>

                <div className="col-md-6">
                    <h1>Pick a protein</h1>
                    <SaladSelect selectName="protein" onChange={this.handleChange} selections={this.proteins} selected={this.state.protein} />
                </div>

                <h1>Pick extras</h1>
                {this.extras.map(name =>
                    <div className="form-check col-4" key={name}>
                        <input className="form-check-input" name={name} type="checkbox" checked={this.state.extras[name] || false} onChange={this.handleChange} id={name} />
                        <label className="form-check-label" htmlFor={name}>{name}</label>
                    </div>
                )} 
                
                <div className="col-md-12">
                    <h1>Pick a dressing</h1>
                    <SaladSelect selectName="dressing" onChange={this.handleChange} selections={this.dressings} selected={this.state.dressing} />
                </div>

                <div className="col-12">
                    <input className="btn btn-primary" type="submit" value="Submit" / >
                </div>
            </form>
        )
    }
}

export default ComposeSalad;