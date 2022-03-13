const connection = require('./connection')

class OrderRepository {
    createOrder(userId, addressId, total, note, callback) {
        const query = `insert into orders values(NULL, ?, ?, ?, CURRENT_TIMESTAMP, 'waiting payment', ?)`
        connection.query(query, [userId, addressId, total, note], (err, result, fields) => {
            callback(result.insertId)
        })
    }

    createOrderLine(orderId, productId, qty) {
        const query = `insert into order_items values(NULL, ?, ?, ?)`
        connection.query(query, [orderId, productId, qty])
    }
}

module.exports = new OrderRepository()
