const mongoose = require('mongoose')
const Schema = mongoose.Schema



const iot = new Schema({
    state: String,
    name: String,
    country: String,
    geolocation: {
        lat: Number,
        lon: Number
    },
    data: {
        type: Date,
        dafault: Date.now()
    },
    sensor:{
        temperature: Number,
        humidity: Number,
        noise_pollution: Number,
        toxic_gases:{
            co: Number,
            smoke: Number,
            lta: Number,
        }
    },
    current_weather: {
        temperature: Number,
        wind_direction: String,
        wind_velocity: Number,
        humidity: Number,
        condition: String,
        pressure: Number,
        icon: String,
        sensation_current: Number,
    },
    flowSegmentData: {
        frc: String,
        currentSpeed: Number,
        freeFlowSpeed: Number,
        currentTravelTime: Number,
        freeFlowTravelTime: Number,
        confidence: Number,
    }
})

// current
// {
//     "id": 7704,
//     "name": "Belém",
//     "state": "PA",
//     "country": "BR  ",
//     "data": {
//         "temperature": 26,
//         "wind_direction": "NE",
//         "wind_velocity": 9,
//         "humidity": 89,
//         "condition": "Muitas nuvens",
//         "pressure": 1014,
//         "icon": "2r",
//         "sensation": 28,
//         "date": "2019-03-04 09:40:16"
//     }
// }


// predict_72h
// "data": [
//     {
//         "date": "2019-03-04 00:00:00",
//         "date_br": "04/03/2019 00:00:00",
//         "rain": {
//             "precipitation": 1
//         },
//         "wind": {
//             "velocity": 8.2,
//             "direction": "NNE",
//             "directiondegrees": 34,
//             "gust": 21.7
//         },
//         "temperature": {
//             "temperature": 24
//         }
//     },
//     {
//         "date": "2019-03-04 01:00:00",
//         "date_br": "04/03/2019 01:00:00",
//         "rain": {
//             "precipitation": 1
//         },
//         "wind": {
//             "velocity": 7.7,
//             "direction": "NNE",
//             "directiondegrees": 33,
//             "gust": 21.7
//         },
//         "temperature": {
//             "temperature": 23
//         }
//     },
//     ....
//     ....

//
module.exports = mongoose.model('iot', iot);
