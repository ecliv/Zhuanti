const { response } = require('express');
const categoryRepository = require('../repository/categoryRepository')
const productRepository = require('../repository/productRepository')

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

let sessionData = {}

class BotController {
    handleWebhook = (req, res, next) => {
        const tag = req.body.queryResult.intent.displayName
        console.log(tag)
        let jsonResponse = {}
        const parameters = req.body.queryResult.parameters
        const sessionId = req.body.session
        let productId = 0

        switch (tag) {
            case "menu.list":
                categoryRepository.getCategories((data) => {
                    console.log(data)
                    const options = data.map(category => {
                        return { "text": category.name }
                    });

                    jsonResponse = {
                        "fulfillmentMessages": [
                            {
                                "text": {
                                    "text": [
                                        "Please pick one from our categories:"
                                    ]
                                }
                            },
                            {
                                "payload": {
                                    "richContent": [
                                        [
                                            {
                                                "options": options,
                                                "type": "chips"
                                            }
                                        ]
                                    ]
                                }
                            }
                        ]
                    }
                    res.send(jsonResponse)
                })
                
                break;
            case "drinksmenu.list":
                productRepository.getProductsWithCategory(1, (data) => {
                    const response = this.constructMenuResponse("Here is the menu for Drinks:", data)
                    res.send(response)
                })
                break;
            case "beansmenu.list":
                productRepository.getProductsWithCategory(2, (data) => {
                    const response = this.constructMenuResponse("Here is the menu for our Coffee Beans:", data)
                    res.send(response)
                })
                break;
            case "merchmenu.list":
                productRepository.getProductsWithCategory(3, (data) => {
                    const response = this.constructMenuResponse("Here is the menu for our Merchandise:", data)
                    res.send(response)
                })
                break;
            case "allproducts":
                productRepository.getProducts((data) => {
                    const response = this.constructMenuResponse("Here is the full list of our products:", data)
                    res.send(response)
                })
                break;
            case "select.product":
                productId = parameters && parameters.id || 0
                productRepository.getProductDetail(productId, (product) => {
                    if (product.length == 0) {
                        sessionData[sessionId] = { productId: product[0].id }
                        const response = this.constructAskForEmailResponse(product[0].id)
                        console.log(response)
                        res.send(response)
                    } else if (product[0].children && product[0].children.length > 0) {
                        const response = this.constructVariantResponse(product[0].name, product[0].children)
                        console.log(response)
                        res.send(response)
                    } else {
                        sessionData[sessionId] = { productId: product[0].id }
                        const response = this.constructAskForEmailResponse(product[0].id)
                        console.log(response)
                        res.send(response)
                    }
                })
                break;
            case "select.product.ask.email":
                console.log(req.body)
                console.log(sessionData[sessionId])
                const response = this.askForEmail(productId)
                res.send(response)
                break;
            case "select.product.email":
                console.log(req.body)
                console.log(sessionData[sessionId])
                res.send("")
                break;
            default:
                console.log(req.body)
                break;
        }

        // ATC FLOW
        // - email?
            // - new user - create
        // - ATC (check for stock)
        // - pick up?
            // - NO: deliver to?
        // - ATC + checkout
    }

    askForEmail = (productId) => {
        return {
            "fulfillmentMessages": [
                {
                    "text": {
                        "text": [`Please provide your email address for order confirmation and pick up information.`]
                    }
                }
            ]
        }
    }

    constructAskForEmailResponse = (productId) => {
        return {
            "fulfillmentMessages": [
                {
                    "text": {
                        "text": [`Please provide your email address for order confirmation and pick up information.`]
                    }
                }
            ]
        }
    }

    constructVariantResponse = (productName, variants) => {
        let menu = []
        variants.forEach(variant => {
            const item = {
                "type": "list",
                "title": `${variant.name} - ${formatter.format(variant.price)}`,
                "subtitle": variant.description,
                "event": {
                    "name": "select_product_event",
                    "languageCode": "en-US",
                    "parameters": {
                        "id": variant.id,
                        "name": `${productName} - ${variant.name}`
                    }
                }
            }
            menu.push(item)
            menu.push({
                "type": "divider"
            })
        })
        menu.pop()

        return {
            "fulfillmentMessages": [
                {
                    "text": {
                        "text": [`We have several option for ${productName}. Please choose one`]
                    }
                },
                {
                    "payload": {
                        "richContent": [
                            menu
                        ]
                    }
                }
            ]
        }
    }

    constructMenuResponse = (title, products) => {
        let menu = []
        products.forEach(product => {
            const item = {
                "type": "list",
                "title": `${product.name} - ${formatter.format(product.price)}`,
                "subtitle": product.description,
                "event": {
                    "name": "select_product_event",
                    "languageCode": "en-US",
                    "parameters": {
                        "id": product.id,
                        "name": product.name
                    }
                }
            }
            menu.push(item)
            menu.push({
                "type": "divider"
            })
        })
        menu.pop()

        return {
            "fulfillmentMessages": [
                {
                    "text": {
                        "text": [title]
                    }
                },
                {
                    "payload": {
                        "richContent": [
                            menu
                        ]
                    }
                }
            ]
        }
    }
}

module.exports = new BotController()