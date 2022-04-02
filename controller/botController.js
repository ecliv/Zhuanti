const categoryRepository = require('../repository/categoryRepository')

class BotController {
    handleWebhook(req, res, next) {
        const tag = req.body.queryResult.intent.displayName
        console.log(tag)
        let jsonResponse = {}

        switch (tag) {
            case "menu.list":
                categoryRepository.getCategories((data) => {
                    let options = []
                    for (const index in data) {
                        options.push({
                            "text": data[index].name
                        })
                    }

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
                })
                
                break;
        }
    }
}

module.exports = new BotController()