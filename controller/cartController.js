const repository = require('../repository/cartRepository')

class CartController {
    getUserCart(req, res, next) {
        repository.getUserCart(res.locals.user.id, (cartItems) => {
            let cartTotal = 0
            cartItems.forEach(item => {
                cartTotal += item.total
            })

            const data = {
                cartTotal,
                items: cartItems
            }

            res.send(data)
        })
    }

    addToCart(req, res, next) {
        const product_id = req.body.product_id
        const qty = req.body.qty
        repository.addToCart(res.locals.user.id, product_id, qty)
        res.sendStatus(200)
    }
}

module.exports = new CartController()