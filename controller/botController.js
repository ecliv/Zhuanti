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
                            "card": {
                                "title": "Beans",
                                "subtitle": "asdf asdf adf",
                                "imageUri": "https://example.com/images/example.png",
                                "buttons": [
                                    {
                                        "text": "See Full List",
                                        "postback": "https://example.com/path/for/end-user/to/follow"
                                    }
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