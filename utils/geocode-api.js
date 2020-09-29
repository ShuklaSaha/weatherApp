const request = require('request')
const geocode = (location, callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1Ijoic2h1a2xhMW9jdCIsImEiOiJja2ZmOXR3bngwMjRyMnZwYWY2bmV3bXFjIn0.TEEve1oo8cE5Cm4syPS_yA&limit=1'
    request({
        url, 
        json: true
    },
        (error, {body}) => { 
            if (error)
                callback('Error occured to call geocode api', undefined)
            else if (body.features.length === 0) {
                callback('Unable to find the location.', undefined)
            } else {
                callback(undefined,{
                    longitude: body.features[0].center[0],
                    latitude: body.features[0].center[1],
                    place: body.features[0].place_name
                })
            }
        })
}
module.exports={
    geocode:geocode
}