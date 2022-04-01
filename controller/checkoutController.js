const cartRepository = require('../repository/cartRepository')
const orderRepository = require('../repository/orderRepository')
const productRepository = require('../repository/productRepository')

class CheckoutController {
    checkout = (req, res, next) => {
        // get user carts
        const getUserCartPromise = userId => new Promise(resolve => cartRepository.getUserCart(userId, resolve))

        getUserCartPromise(res.locals.user.id)
            .then(cartItems => {
                let cartTotal = 0
                let productIds = []
                cartItems.forEach(item => {
                    cartTotal += item.total
                    productIds.push(item.id)
                })

                this.validateStocks(cartItems, cartTotal, productIds, req, res)
            })
    }

    validateStocks = (cartItems, cartTotal, productIds, req, res) => {
        const getStocks = productIds => new Promise(resolve => productRepository.getStockForProducts(productIds, resolve))

        getStocks(productIds)
            .then((stocks) => {
                console.log(stocks)
                try {
                    cartItems.forEach((item) => {
                        const stock = stocks.find(stock => stock.id == item.id)

                        if (!stock || stock.stock < item.qty) {
                            let productFullName = item.name
                            if (!!item.parent_name) {
                                productFullName = `${item.parent_name} - ${productFullName}`
                            }
                            res.status(400).send({
                                error: `Insufficient Stock for ${productFullName}. Only ${stock && stock.stock || 0} remaining`
                            })
                            throw '';
                        }
                    })

                    productRepository.reduceStockForProducts(cartItems)
                    this.createOrder(cartItems, cartTotal, req, res)
                } catch (e) {
                    // do nothing
                }
            })
    }

    createOrder(cartItems, cartTotal, req, res) {
        const userId = res.locals.user.id
        const isPickUp = req.body.is_pick_up || false

        orderRepository.createOrder(
            userId,
            req.body.address_id, 
            cartTotal, 
            req.body.note,
            isPickUp,
            (orderId) => {
                cartRepository.clearUserCart(userId)
                cartItems.forEach(item => {
                    console.log(item)
                    orderRepository.createOrderLine(orderId, item.id, item.qty)
                })

                res.sendStatus(200)
            }
        )
    }
}

module.exports = new CheckoutController()