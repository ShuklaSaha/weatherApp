const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCodeAPI = require('../utils/geocode-api')
const weatherAPI = require('../utils/weather-api')
const app = express()
console.log('Current dir:', __dirname)

//setup static directory to serve
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

//setup handlebers engine and view location 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Node with Express',
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'This is a help doc',
        createdBy: 'shukla'
    })
})
//keeping to as a static resource(html)
app.get('/about', (req, res) => {
    res.send('About Page')
})

app.get('/weather', (req, res) => {
    if (!req.query.address) //if address is not provided as query string
        res.send({
            error: 'You must provide an address'
        })
    else {
        geoCodeAPI.geocode(req.query.address, (error, { longitude, latitude, place }) => {
            if (error)
                res.send({error})
            else {
                weatherAPI.weatherReport(latitude, longitude, (error, { body }) => {
                    if (error)
                        res.send({error})
                    else {
                        res.render('weather', {
                            title: 'Weather Description',
                            location: place,
                            description: body
                        })
                    }
                })
            }
        })

    }
})
app.get('*', (req, res) => {
    res.send('<h3 style="color:red">404 Page Not Found</h3>')
})
app.listen(3000, () => {
    console.log('server started at port 3000')
})