const login = require("nedb");

//UserDao class 
class UserDAO {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new login({
                filename: dbFilePath,
                autoload: true
            })
        } else {
            this.db = new login();
        }

        //Inserts login data to database
        this.db.insert({
            user: 'Admin',
            password: '$2a$12$.hZShaLcrj/2o4bWb11g4uG0anpLZWYrCR54kQGhiXN7O4kc0T9z.'
        });
    }
}

const dao = new UserDAO();

module.exports = dao;