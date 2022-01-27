import { Component } from "react";

class ViewOrder extends Component{
    constructor(props){
        super(props);
        this.recieveSalads = props.recieveSalads;
        this.renderSalad = this.renderSalad.bind(this);
    }

    renderSalad(salad){
        return(
            <p>
                SALAD
            </p>
        )
    }

    render(){
        const salads = this.recieveSalads();

        return(
            <div>
                {JSON.stringify(salads)}
                <h1>Orders</h1>
                {salads.map((salad) =>
                    <div>
                        <h3>Foundation</h3>
                        <p>{salad.foundation}</p>
                    </div>
                )}
            </div>
        )
    }
}

export default ViewOrder;