
const request = require('request');

const geocode = (address, callback) => {
    const mapBoxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZGlsaXByYWdoYXZhbiIsImEiOiJja2xkcjM0ZjMxY2x1MzFwOWk0cm16ajZxIn0.ykBBOnE6u58eLx8a4IIT7g&limit=1`;

    request({url: mapBoxURL, json: true}, (error, response) => 
    {
        if(error){
            callback('Could not connect to map box.');
        }else if(response.body.features.length === 0){
            callback('No results.')
        }
        else{
            console.log(response.body.features);
            callback(undefined,
                {
                    long: response.body.features[0].center[0],
                    lat: response.body.features[0].center[1]
                });
        }
    })

};

module.exports = geocode;