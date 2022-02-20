var connection = require('./connection')

class UserRepository {
    registerUser(data, password) {
        console.log("repo" + password)
        const query = `INSERT INTO users VALUES(NULL, ?, ?, ?, false, ?)`
        connection.query(query, [data.email, data.first_name, data.last_name, "" + password], (err, rows, fields) => {
            console.log(err)
        })
    }
}

module.exports = new UserRepository()