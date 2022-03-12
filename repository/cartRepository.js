var connection = require('./connection')

class CartRepository {
    addToCart(userId, productId, qty) {
        const query = `insert into cart_items values(NULL, ?, ?, ?)`
        connection.query(query, [userId, productId, qty])
    }

    getUserCart(userId, valueCallback) {
        const query = `select p.name, parent.name as parent_name, p.image_url, p.price, p.description, c.qty, p.price * c.qty as 'total' from cart_items c 
        join products p on c.product_id = p.id
        join products parent on p.parent_id = parent.id
        where c.user_id = ?`

        connection.query(query, [userId], (err, rows, fields) => {
            if (err != null) {
                console.log(err)
                valueCallback([])
            } else {
                valueCallback(rows)
            }
        })
    }
}

module.exports = new CartRepository()
