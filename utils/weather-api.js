const request = require('request')
const weatherBaseAPI = 'http://api.weatherstack.com/current?access_key=73173986aff666fa65af71a12d7ae637&query='


const weatherReport = (latitude, longitude,callback) => {
    const url=weatherBaseAPI + latitude + ',' + longitude
    request({
        url,
        json: true
    },
        (error, {body}) => {
            if (error)
                return callback('error occured to call weatherstack api',undefined)
            else
                return callback(undefined,{
                    body:'It is currently ' + body.current.temperature + ' degrees out.There is ' + body.current.precip + 'mm of rain today.'
                })

        })
}

module.exports={
    weatherReport:weatherReport}
