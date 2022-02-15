import { useParams } from 'react-router-dom';

export default function ViewIngredient(props) {
    const ingredient = useParams().name;
    const inventory = props.inventory;
    const values = inventory[ingredient];

    return (
        <div>
            <h1>
                {ingredient}
            </h1>
            <p>
                {values["vegan"] ? "Vegan, " : ""}
                {values["gluten"] ? "Gluten, " : ""}
                {values["lactose"] ? "Lactose, " : ""}
                Price: {values["price"]} Kr.
            </p>
        </div>
    );
}