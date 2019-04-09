const axios = require('axios')
const constrants = require('./../bin/constants')
const Iot = require('../models/iot')
exports.post = ('/', async (req, res, next) => {    
    // recuperar dados 
    // tempo real
    try {
        // TODO: get request modify
        //res.status(200).send({"received": req.body})
        // TODO: get request
        // const geolocation = req.body.geolocation
        ///// TODO: remove 
        const {lat, lon, speed, sensor} = req.body
        ///// TODO: remove
        //const lat = req.body.lat//'52.41072'
        //const log = req.body.log//'4.84239'
        const data = new Date()
        console.log(data)
        
        const wheater = await axios.get(constrants.current_weather)
        
        const name = wheater.data.name
        const state = wheater.data.state
        const country = wheater.data.country
        const current_weather = wheater.data.data
        
        const flowData = await axios.get(constrants.flow_segment.replace(':LAT', lat).replace(':LOG', lon))
        
        const { frc,
            currentSpeed,
            freeFlowSpeed,
            currentTravelTime,
            freeFlowTravelTime,       
            confidence } = flowData.data.flowSegmentData
            
        const flowSegmentData = {
            frc,
            currentSpeed,
            freeFlowSpeed,
            currentTravelTime,
            freeFlowTravelTime,
            confidence
        }

        const iot = new Iot({
            state,
            name,
            country,
            geolocation: {
                lat,
                lon,
                speed
            },
            data,
            sensor,
            current_weather,
            flowSegmentData
        });
        
        await iot.save()
        console.log(iot)
        res.send(iot)
        console.log("saved!")
    } catch (e) {
        console.log({ error: e })
        res.send({ error: e })
    }
    // sensor:{
    //     temperature: Number,
    //     humidity: Number,
    //     noise_pollution: Number,
    //     toxic_gases:{
    //         co: Number,
    //         smoke: Number,
    //         lta: Number,
    //     }
    // }

    // current_wheater = {
    //     temperature: Number,
    //     wind_direction: String,
    //     wind_velocity: Number,
    //     humidity: Number,
    //     condition: String,
    //     pressure: Number,
    //     icon: String,
    //     sensation_current: Number,
    // }
    // requisições de trafego
    // salvar no banco
    // res.send({ ok: "ok" })
})

exports.test = (req, res, next) => {
    console.log("ok");
    res.send({ok:"ok"})
}

exports.get = async (req, res, next) => {
    const data = await Iot.find({});
    res.send(data);
}
