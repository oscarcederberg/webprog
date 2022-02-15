import {v4 as uuidv4} from 'uuid';

class Salad {
    constructor(ingredients){
        this.uuid = uuidv4();
        this.ingredients = ingredients;

        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.get = this.get.bind(this);
        this.getPrice = this.getPrice.bind(this);
        this.count = this.count.bind(this);
    }

    add(name, properties){
        this.ingredients[name] = properties;
        return this;
    }

    remove(name){
        delete this.ingredients[name];
        return this;
    }

    get(part){
        return Object.entries(this.ingredients)
        .filter((entry) => entry[1][part])
        .map((entry) => entry[0])
        .join(', ');
    }

    getPrice(){
        return Object.values(this.ingredients)
        .reduce((acc, values) => acc + values.price, 0);
    }

    count(part){
        return Object.values(this.ingredients)
        .filter((values) => values[part])
        .reduce((acc, _) => acc + 1, 0);
    }
}

export default Salad;