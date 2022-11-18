var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const fetch = require('node-fetch')
const FormData = require('form-data')
dotenv.config()
const cors = require('cors')
//These are the API keys for the different APIs
const baseURL = process.env.BASE_URL
const apiKey = process.env.API_KEY
//This is a variable to store the data from the API
const app = express()
app.use(express.static('dist'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

console.log(__dirname)

//This is the route to the index.html file
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

//This is the route to the mockAPI.js file
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

//This is the route to the API. It takes the URL from the form and sends it to the API. It then returns the data from the API.
app.post('/nlp', async function (req, res) {
    const { url } = req.body

    const form = new FormData()
    form.append("key", apiKey)
    form.append("txt", url)
    form.append("lang", "en")

    try {
        const resp = await fetch(baseURL, {
        method: 'POST',
        body: form})
        const data = await resp.json()
        res.status(200).json({ data })
    } catch (error) {
        res.status(400).json({ error })
    }
})
//This is the port that the server is listening on
app.listen(8081, function () {
    console.log('NLP listening on port 8081!')
})