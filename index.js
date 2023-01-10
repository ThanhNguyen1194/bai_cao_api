const express = require("express");
const listCardData = require("./data/listCard.json")
const cors = require("cors")

const app = express()
const port = process.env.PORT || 3000
app.use(cors())

app.use(express.json())

app.use("/api", (req, res) => { res.send("hello") })

let initListCard = [...listCardData.cards.sort(() => { return Math.random() - 0.5 })]
// const array_demo = [1, 7, 2, 3, 4, 5, 6]
// array_demo.sort(() => { return Math.random() - 0.5 })
// console.log(array_demo)

//lấy danh sách bài
app.use("/listcard", (req, res) => {
    try {
        const result = {
            "success": true,
            "shuffled": true,
            "remaining": initListCard.length,
            "listCard": initListCard
        }
        res.send(result)
    } catch (error) {
        res.send({ "success": false, "error": error })
    }

})
//rút bài
app.use("/draw/:count", (req, res) => {
    if (initListCard.length >= req.params.count) {

        try {
            const { count } = req.params
            const listCardDraw = []
            for (let i = 0; i < count; i++) {

                listCardDraw.push(initListCard.shift())

            }
            const result = {
                "success": true,
                "remaining": initListCard.length,
                "listCard": listCardDraw
            }
            res.send(result)
        } catch (error) {
            res.send({ "success": false, "error": error })


        }
    } else {
        res.send({ "success": false, "error": "not enough card" })
    }

})
//xào bài
app.use("/shuffle", (req, res) => {
    try {
        initListCard.sort(() => { return Math.random() - 0.5 })

        const result = {
            "success": true,
            "shuffled": true,
            "remaining": initListCard.length,
            "listCard": initListCard
        }
        res.send(result)
        console.log(listCardDraw)
    } catch (error) {
        res.send({ "success": false, "error": error })

    }

})
//làm mới bài
app.use("/newlistcard", (req, res) => {
    try {
        initListCard = [...listCardData.cards.sort(() => { return Math.random() - 0.5 })]

        console.log(listCardData.cards.length)
        const result = {
            "success": true,
            "shuffled": true,
            "remaining": initListCard.length,
            "listCard": initListCard
        }
        res.send(result)
    } catch (error) {
        res.send({ "success": false, "error": error })

    }
})
app.listen(port, async () => {
    console.log(`App listening on http://localhost:${port}`)
})