class Salad {
    static instanceCounter = 0;
    constructor(){
        this.uuid = 'salad_' + Salad.instanceCounter++;
        this.ingredients = {};
    }

    add(name, properties){
        this.ingredients[name] = properties;
        return this;
    }

    remove(name){
        delete this.ingredients[name];
        return this;
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