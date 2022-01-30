import { Component } from "react";

class ViewOrder extends Component{
    constructor(props){
        super(props);
        this.recieveSalads = props.recieveSalads;
        this.renderSalads = this.renderSalads.bind(this);
    }

    renderSalads(salads){
        return (
            <>
             {salads.map((salad) =>
                <div key={salad.uuid}>
                    <h3>🥗 Sallad</h3>
                    <p>Foundation: {salad.get('foundation')}<br />
                    Protein: {salad.get('protein')}<br />
                    Extras: {salad.count('extra') > 0 ? salad.get('extra') : 'None'}<br />
                    Dressing: {salad.get('dressing')}</p>
                    <p>Price: {salad.getPrice()} Kr</p>
                </div>
            )}
            </>
        )
    }

    render(){
        const salads = this.recieveSalads();

        return(
            <div>
                <h1>Orders</h1>
                {this.renderSalads(salads)}
            </div>
        )
    }
}

export default ViewOrder;