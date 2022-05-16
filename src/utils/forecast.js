const request = require('request')

const forecast = (address,callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?q='+address+'&units=metric&appid=4235cbd456c6aa088bf5d3caaa9f7901';

    request({ url: url, json: true }, (error,response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,'Temprature: '+response.body.main.temp+' degree. The weather is supposed to be '+response.body.weather[0].main);
        }
    })
}
module.exports = forecast;