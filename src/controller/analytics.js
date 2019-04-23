'use strict'
const Iot = require('../models/iot')


exports.mean_analytics = async (req, res, next) => {
    const iots = await Iot.find()

    let temperature_ = 0
    let humidity_ = 0
    let co_ = 0
    let smoke_ = 0
    let lpg_ = 0
    let s_ = 0
    let n_ = 0

    let temperature_c_ = 0
    let humidity_c_ = 0

    let w_ = 0

    iots.forEach((iot) => {
        if (s_ < 200) {
            const {
                temperature: temperature_c,
                humidity: humidity_c,
            } = iot.current_weather

            if (temperature_c && humidity_c ) {

                temperature_c_ += temperature_c
                humidity_c_ += humidity_c
                w_ += 1

            }

            const { temperature, humidity, toxic_gases } = iot.sensor
            const { co, smoke, lpg } = toxic_gases

           

            if (temperature && humidity) {
                temperature_ += temperature
                humidity_ += humidity
                s_ += 1
            }
            if (co !== null && smoke != null && lpg != null) {
                co_ += co
                smoke_ += smoke
                lpg_ += lpg
                n_ += 1
            }
        }
    });


    temperature_ /= s_
    humidity_ /= s_
    co_ /= n_
    smoke_ /= n_
    lpg_ /= n_
    temperature_c_ /= w_
    humidity_c_ /= w_

    res.send({
        temperature_,
        humidity_,
        co_,
        smoke_,
        lpg_,
        temperature_c_,
        humidity_c_,
    })
}


exports.mean_analytics_limit = async (req, res, next) => {
    const iots = await Iot.find()

    let temperature_ = 0
    let humidity_ = 0
    let co_ = 0
    let smoke_ = 0
    let lpg_ = 0
    let s_ = 0
    let n_ = 0

    let temperature_c_ = 0
    let humidity_c_ = 0

    let w_ = 0
    console.log(req.params.limit);
    iots.forEach((iot) => {
        if (s_ < parseInt(req.params.limit)) {
            const {
                temperature: temperature_c,
                humidity: humidity_c,
            } = iot.current_weather

            if (temperature_c && humidity_c ) {

                temperature_c_ += temperature_c
                humidity_c_ += humidity_c
                w_ += 1

            }

            const { temperature, humidity, toxic_gases } = iot.sensor
            const { co, smoke, lpg } = toxic_gases

           

            if (temperature && humidity) {
                temperature_ += temperature
                humidity_ += humidity
                s_ += 1
            }
            if (co !== null && smoke != null && lpg != null) {
                co_ += co
                smoke_ += smoke
                lpg_ += lpg
                n_ += 1
            }
        }
    });


    temperature_ /= s_
    humidity_ /= s_
    co_ /= n_
    smoke_ /= n_
    lpg_ /= n_
    temperature_c_ /= w_
    humidity_c_ /= w_

    res.send({
        temperature_,
        humidity_,
        co_,
        smoke_,
        lpg_,
        temperature_c_,
        humidity_c_,
    })
}