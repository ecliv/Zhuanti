class BotController {
    handleWebhook(req, res, next) {
        const tag = req.body.queryResult.intent.displayName
        console.log(tag)
        let jsonResponse = {}

        switch (tag) {
            case "menu.list":
                jsonResponse = {
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Text response from webhook"
                                ]
                            }
                        },
                        {
                            "payload": {
                                "richContent": [
                                    [
                                        {
                                            "options": [
                                                {
                                                    "text": "Drinks"
                                                },
                                                {
                                                    "text": "Beans"
                                                },
                                                {
                                                    "text": "Merch"
                                                }
                                            ],
                                            "type": "chips"
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                }
                break;
        }


        res.send(jsonResponse)
    }
}

module.exports = new BotController()