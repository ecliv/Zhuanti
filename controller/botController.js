class BotController {
    handleWebhook(req, res, next) {
        const tag = req.body.queryResult.intent.displayName
        let jsonResponse = {
            fulfillment_messages: [
                {
                    text: {
                        text: ['My name is Flowhook'],
                    },
                },
            ],
        };

        console.log(tag)
        res.send(jsonResponse)
    }
}

module.exports = new BotController()