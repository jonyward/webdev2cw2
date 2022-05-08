const nedb = require("nedb");
const { resolve } = require("path");
class Menu {
    constructor(dbFilePath) {
        if(dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true});
            console.log('DB Connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }

    init(){
        this.db.insert({
            name: 'Pepperoni Pizza',
            description: 'Fresh Stone cooked Pepperoni Pizza, made from fresh dough prepaired fresh every day, with a tomato base, mozzarella cheese, bazil and pepperoni toppings.',
            ingredients: 'Dough, Cheese, Tomato, Pepperoni and Bazil',
            allergens: 'Gluten/Wheat',
            price: 5,
            type: 'Dinner',
            availability: true
        });
        console.log('Dish Entered');

        this.db.insert({
            name: 'Spaghetti Bolognese',
            description: 'Spaghetti pasta served with beef mince, tomato and parmesan cheese.',
            ingredients: 'Pasta, Beef mince, Onion, Tomato, Garlic, Parmesan cheese and Bread',
            allergens: 'Gluten/Wheat',
            price: 10,
            type: 'Dinner',
            availability: true
        });
        console.log('Dish Entered');

        this.db.insert({
            name: 'Fettuccine Alfredo',
            description: 'Fettuccine Pasta ran through a mixture of butter and parmesan cheese, garnished with parsley. ',
            ingredients: 'Fettuccine, Cream, Cheese, Parmesan, Garlic and Butter',
            allergens: 'Gluten/Wheat, and Dairy.',
            price: 7,
            type: 'Lunch',
            availability: true
        });
        console.log('Dish Entered');

        this.db.insert({
            name: 'Chicken Parmesan',
            description: 'Breaded Chicken covered by a layer of permesan cheese and tomato sauce, served with spaghetti. ',
            ingredients: 'Chicken Breast, Tomato sauce, Parmesan Cheese and Spaghetti',
            allergens: 'Gluten/Wheat',
            price: 12,
            type: 'Special',
            availability: true
        });
        console.log('Dish Entered');
    }

    getAllDishes(){
        return new Promise((resolve, reject) => {
            this.db.find({}, function(err, dishes){
                if (err) {
                    reject(err);
                } else {
                    resolve(dishes);
                    console.log('function all() returns: ', dishes);
                }
            })
        })
    }

    getDinnerDishes(){
        return new Promise((resolve, reject) => {
            this.db.find({ type: 'Dinner', availability: true }, function(err, dinner) {
                if (err) {
                    reject(err);
                } else {
                    resolve(dinner);
                    console.log('getDinnerDishes() returns ', dinner)
                }
            })
        })
    }
    getAllDinnerDishes(){
        return new Promise((resolve, reject) => {
            this.db.find({ type: 'Dinner' }, function(err, dinner) {
                if (err) {
                    reject(err);
                } else {
                    resolve(dinner);
                    console.log('getDinnerDishes() returns ', dinner)
                }
            })
        })
    }
    getAllSpecialDishes() {
        return new Promise((resolve, reject) => {
            this.db.find({ type: 'Special' }, function(err, special) {
                if (err) {
                    reject(err);
                } else {
                    resolve(special);
                    console.log('getSpecialDishes() returns ', special)
                }
            })
        })
    }
    getSpecialDishes() {
        return new Promise((resolve, reject) => {
            this.db.find({ type: 'Special', availability: true }, function(err, special) {
                if (err) {
                    reject(err);
                } else {
                    resolve(special);
                    console.log('getSpecialDishes() returns ', special)
                }
            })
        })
        
    }
    getLunchDishes(){
        return new Promise((resolve, reject) => {
            this.db.find({ type: 'Lunch', availability: true }, function(err, lunch) {
                if (err) {
                    reject(err);
                } else {
                    resolve(lunch);
                    console.log('getDinnerDishes() returns ', lunch)
                }
            })
        })
    }
    getAllLunchDishes(){
        return new Promise((resolve, reject) => {
            this.db.find({ type: 'Lunch' }, function(err, lunch) {
                if (err) {
                    reject(err);
                } else {
                    resolve(lunch);
                    console.log('getDinnerDishes() returns ', lunch)
                }
            })
        })
    }

    addDish(name, description, ingredients, allergens, price, type, availability) {
        var entry = {
            name: name, 
            description: description,
            ingredients: ingredients,
            allergens: allergens,
            price: price,
            type: type,
            availability: availability
        }
        console.log('Dish Added', entry);
        this.db.insert(entry, function(err, doc) {
            if (err) {
                console.log('Error inserting dish', subject);
            } else {
            console.log('Dish inserted into the database', doc);
            }
        })
    }

    getDishByName(name) {
        return new Promise((resolve, reject) => {
            this.db.find({ 'name': name}, function(err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('getDishByName returns: ', entries);
                }
            })
        })
    }

    getDishById(id) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ '_id': id}, function(err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('getDishById returns: ', entries);
                }
            })
        })
    }

    updateDish(id, name, description, ingredients, allergens, price, type, availability) {
        return new Promise((resolve, reject) => {
            availability = availability === "True";
            price = Number(price);
            this.db.update({ "_id": id}, { $set: {'name': name, 'description': description, 'ingredients': ingredients, 'allergens': allergens, 'price': price, "type": type, 'availability': availability }}, {}, function(err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('updateDish returns: ', entries);
                }
            })
        })
    }
}

module.exports = Menu