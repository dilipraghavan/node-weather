
const request = require('request');

 
const weather = (long, lat, callback) =>{
    const weatherStackUrl = `http://api.weatherstack.com/current?access_key=8d5c898cc0651232604c54044b900479&query=${lat},${long}`;
    request({url: weatherStackUrl, json: true} , (error, response) => {
        if(error){
            callback('Unable to access weather service');
        }else if(response.body.success === false){
            callback('Location does not exist');
        }else{
            callback(undefined, {
                temparature: response.body.current.temperature,
                feelsLike: response.body.current.feelslike
            }
            );
        }
    }
    );
}

module.exports = weather;