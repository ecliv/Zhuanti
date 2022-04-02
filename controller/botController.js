const categoryRepository = require('../repository/categoryRepository')
const productRepository = require('../repository/productRepository')

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

class BotController {
    handleWebhook = (req, res, next) => {
        const tag = req.body.queryResult.intent.displayName
        console.log(tag)
        let jsonResponse = {}

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
                    const response = this.constructMenuResponse(data)
                    res.send(response)
                })
                break;
        }
    }

    constructMenuResponse = (products) => {
        const cards = products.map(product => {
            return {
                "card": {
                    "title": `${product.name} - ${formatter.format(product.price)}`,
                    "subtitle": product.description,
                    "imageUri": product.image_url,
                }
            }
        })

        return {
            "fulfillmentMessages": [
                {
                    "text": {
                        "text": [
                            "Here is the menu for Drinks:"
                        ]
                    }
                },
                ...cards
            ]
        }
    }
}

module.exports = new BotController()