var connection = require('./connection')

class UserRepository {
    registerUser(data, password) {
        const query = `INSERT INTO users VALUES(NULL, ?, ?, ?, false, ?)`
        connection.query(query, [data.email, data.first_name, data.last_name, "" + password], (err, rows, fields) => {
            console.log(err)
        })
    }

    getUserFromEmail(email, valueCallback) {
        const query = `SELECT * FROM users WHERE email = ?`
        connection.query(query, [email], (err, rows, fields) => {
            if (rows.length > 0) {
                valueCallback(rows[0])
            } else {
                valueCallback(null)
            }
            
        })
    }
}

module.exports = new UserRepository()