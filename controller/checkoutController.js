const cartRepository = require('../repository/cartRepository')
const productRepository = require('../repository/productRepository')

class CheckoutController {
    checkout = (req, res, next) => {
        // get user carts
        const getUserCartPromise = userId => new Promise(resolve => cartRepository.getUserCart(userId, resolve))
        var self = this

        getUserCartPromise(res.locals.user.id)
            .then(cartItems => {
                let cartTotal = 0
                let productIds = []
                cartItems.forEach(item => {
                    cartTotal += item.total
                    productIds.push(item.id)
                })

                console.log(productIds)
                this.validateStocks(cartItems, cartTotal, productIds, res)
            })
    }

    validateStocks(cartItems, cartTotal, productIds, res) {
        productRepository.getStockForProducts(productIds, (stocks) => {
            console.log(stocks)
            try {
                cartItems.forEach((item) => {
                    const stock = stocks.find(stock => stock.id == item.id)

                    console.log(stock)
                    console.log(item.qty)
                    if (!stock || stock.stock < item.qty) {
                        let productFullName = item.name
                        if (!!item.parent_name) {
                            productFullName = `${item.parent_name} - ${productFullName}`
                        }
                        res.send({
                            error: `Insufficient Stock for ${productFullName}. Only ${stock && stock.stock || 0} remaining`
                        }, 400)
                        throw '';
                    }
                })
            } catch (e) {
                // do nothing
            }
        })
    }
}

module.exports = new CheckoutController()