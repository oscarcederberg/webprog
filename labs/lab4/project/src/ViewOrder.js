import { Component } from "react";

class ViewOrder extends Component{
    constructor(props){
        super(props);
        this.renderSalads = this.renderSalads.bind(this);
        this.sendOrder = this.sendOrder.bind(this);
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

    sendOrder() {
        let salads = Object.values(this.props.recieveSalads)
        .map(salad => {return Object.keys(salad.ingredients)});
        
        fetch('http://localhost:8080/orders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(salads),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    render(){
        return(
            <div>
                <h1>Orders</h1>
                {this.renderSalads(this.props.recieveSalads)}
                <button type="button" className="btn btn-primary btn-lg" onClick={this.sendOrder}>Send order</button>
            </div>
        )
    }
}

export default ViewOrder;