const repository = require('../repository/cartRepository')
const productRepository = require('../repository/productRepository')

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
        
        productRepository.getStockForProduct(product_id, (stock) => {
            repository.getProductCountInCart(res.locals.user.id, product_id, (qty) => {
                if (qty == 0 && stock >= 1) {
                    repository.addToCart(res.locals.user.id, product_id)
                    res.sendStatus(200)
                } else if (stock >= qty + 1) {
                    repository.incrementProductInCart(res.locals.user.id, product_id)
                    console.log("up here")
                    res.sendStatus(200)
                } else {
                    console.log("down here")
                    res.status(400).send({
                        "error": "Insufficient stock. Stock remaining is " + stock
                    })
                }
            })
        })
    }

    deleteFromCart(req, res, next) {
        const product_id = req.body.product_id
        const userId = res.locals.user.id
        repository.getProductCountInCart(userId, product_id, (qty) => {
            if (qty == 1) {
                repository.removeProductFromCart(userId, product_id)
            } else {
                repository.decreateProductInCart(userId, product_id)
            }


            res.sendStatus(200)
        })
    }
}

module.exports = new CartController()