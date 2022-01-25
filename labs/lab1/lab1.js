'use strict';
/*
 * Reflection question 1
 * Properties that are undefined are falsy, and will return false in boolean expressions. 
 * They don't have to be defined either to be called, so in this case we only have to declare properties that are true.
 */

const imported = require("./inventory.js");
console.log(imported.inventory['Sallad']);

console.log('Object.keys():')
let names = Object.keys(imported.inventory);
names
.sort((a, b) => a.localeCompare(b, "sv", {sensitivity: 'case'}))
.forEach(name => console.log(name));

/*
 * Reflection question 2
 * If a property is defined with defineProperty(), the internal enumerable flag is set to false.
 * In that case, it cannot be enumerated with a for ... in-loop, but I assume that .forEach() can still be used.
 * 
 * According to developer.mozilla.org, Object.keys() does not detect inherited properties 
 * (no matter if they are enumerable or not). "in" and for...in-loops (if enumerable) does, howeveer.
 */

console.log('\n--- Assignment 1 ---------------------------------------')

function makeOptions(inventory, part){
    return Object.entries(inventory)
    .filter((entry) => entry[1][part]) // Is it possible to somehow do {name, values} instead of entry?
    .reduce((acc, entry) => acc + '<option value="' + entry[0] + '"> ' + entry[0] + ', ' + entry[1].price + ' kr</option>\n', '')
}

console.log(makeOptions(imported.inventory, 'foundation'));

console.log('\n--- Assignment 2 ---------------------------------------')
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
// Static Instance Counter. Is there a better way?
// Salad.instanceCounter = 0;

let myCaesarSalad = new Salad()
.add('Sallad', imported.inventory['Sallad'])
.add('Kycklingfilé', imported.inventory['Kycklingfilé'])
.add('Bacon', imported.inventory['Bacon'])
.add('Krutonger', imported.inventory['Krutonger'])
.add('Parmesan', imported.inventory['Parmesan'])
.add('Ceasardressing', imported.inventory['Ceasardressing'])
.add('Gurka', imported.inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');

console.log('\n--- Assignment 3 ---------------------------------------')
console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
// En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
// En ceasarsallad har 3 tillbehör

/*
 * Reflection question 3
 * Salad is of type Function, while its prototype is object, and object's prototype is undefined (shouldn't it be null?)
 * Meanwhile, myCaesarSalad is an object, with and undefined prototype (null???)
 * 
 * All objects have a prototype property, and I guess even null might have one (null)?
 * To get the next one in a prototype chain, do prototype().prototype();
 */
console.log('typeof Salad: ' + typeof Salad);
console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 2: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));

console.log('\n--- Assignment 4 ---------------------------------------')

class GourmetSalad extends Salad {
    constructor(){
        super();
    }

    add(name, properties, size = 1){
        size += (this.ingredients[name] ? this.ingredients[name].size : 0);
        super.add(name, { ...properties, size: size});
        return this;
    }

    getPrice(){
        return Object.values(this.ingredients)
        .reduce((acc, values) => acc + values.price * values.size, 0);
    }
}

let myGourmetSalad = new GourmetSalad()
.add('Sallad', imported.inventory['Sallad'], 0.5)
.add('Kycklingfilé', imported.inventory['Kycklingfilé'], 2)
.add('Bacon', imported.inventory['Bacon'], 0.5)
.add('Krutonger', imported.inventory['Krutonger'])
.add('Parmesan', imported.inventory['Parmesan'], 2)
.add('Ceasardressing', imported.inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
// 50kr instead of 40kr.
myGourmetSalad.add('Bacon', imported.inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');
// 60kr instead of 50kr.

console.log('\n--- Assignment 5 ---------------------------------------')
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);
console.log('Min sallad har uuid: ' + myCaesarSalad.uuid);
console.log('Min gourmetsallad har: ' + myGourmetSalad.count('extra'));

/**
 * Reflection question 4
 * Static properties are stored in the Function object.
 */
/**
 * Reflection question 5
 * `Object.defineProperty(this, ...)` should do it, it sets writable to false by default.
 */
/**
 * Reflection question 6
 * Rename `uuid` to `#uuid` to make it private.
 */
