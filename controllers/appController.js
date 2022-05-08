const { response } = require("express");
const { render } = require("mustache");
const menuDAO = require("../models/menuModel");
const dao = require("../models/loginModel");

const db = new menuDAO();
db.init();

//shows login page
exports.show_login = function (req, res) {
    res.render("login");
};

//shows about us page
exports.show_about = function (req, res) {
    res.render("about");
};

//redirects user to staff page
exports.handle_login = function (req, res) {   
    res.redirect("/staff")
}

//populates main view with data, specific to the menu data falls under
exports.main_page = function (req, res) {
    let type = req.params.type;
    db.getDinnerDishes(type)
        .then((dinner) => {
            db.getLunchDishes(type)
                .then((lunch) => {
                    db.getSpecialDishes(type)
                        .then((special) => {
                    res.render("main", {
                        dinner: dinner,
                        lunch: lunch,
                        special: special,
                    })
                });
                });
        })
        .catch((err) => {
            console.log("promise rejected", err);
        });
};

//shows update page view
exports.show_update_page = function (req, res) {
    const id = req.params.id;
    db.getDishById(id)
        .then((entries) => {
            console.log(entries);
            res.render("edit", {
                dish: entries,
            })
        });
}

//shows staff page view
exports.staff_page = function (req, res) {
    let type = req.params.type;
    db.getAllDinnerDishes(type)
        .then((dinner) => {
            db.getAllLunchDishes(type)
                .then((lunch) => {
                    db.getAllSpecialDishes(type)
                        .then ((special) => {
                            res.render("staff", {
                                dinner: dinner,
                                lunch: lunch,
                                special: special
                            })
                        })
                    })
                })
        .catch((err) => {
            console.log("promise rejected", err);
        });
};

//post function ran after add dish form on staff page view is completed
exports.post_new_entry = function (req, res) {
    console.log("processing post_new_dish controller");
    if (!req.body.name) {
        response.status(400).send("Dish must have a name.");
        return;
    }
    db.addDish(req.body.name, req.body.description, req.body.ingredients, req.body.allergens, req.body.price, req.body.type, req.body.availability === "True");
    res.redirect("/staff");
}

//post function ran after update dish form on update page view is completed
exports.post_update = function (req, res) {
    console.log("Updating existing Dish");
    if (!req.body.name) {
        response.status(400).send("Dish must have a name.");
        return;
    }
    db.updateDish(req.body.id, req.body.name, req.body.description, req.body.ingredients, req.body.allergens, req.body.price, req.body.type, req.body.availability);
    res.redirect("/staff");
}

//shows new dishes
exports.show_new_dishes = function (req, res) {
    let dish = req.params.name;
    db.getDishByName(dish)
        .then((entries) => {
            res.render("main", {
                dinner: dinner,
                lunch: lunch,
            });
        })
        .catch((err) => {
            console.log("Error: ");
            console.log(JSON.stringify(err));
        });
};

//times out any running login cookies
exports.logout = function (req, res) {
    res.clearCookie("jwt").status(200).redirect("/");
  };
  