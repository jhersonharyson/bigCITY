"use strict";
const Iot = require("../models/iot");

exports.mean_analytics = async (req, res, next) => {
  const iots = await Iot.find()
    .sort([["data", "descending"]])
    .limit(200);
  res.send(processMeam(iots));
};

exports.mean_analytics_limit = async (req, res, next) => {
  const iots = await Iot.find()
    .sort([["data", "descending"]])
    .limit(parseInt(req.params.limit));

  res.send(processMeam(iots));
};

exports.mean_analytics_last_interval = async (req, res, next) => {
  const now =
    new Date().getTime() - 60 * 60 * 1000 * (parseInt(req.params.hours) || 1);
  const iot = await Iot.find({})
    .where("data")
    .gt(new Date(now))
    .sort([["data", "descending"]]);

  res.send({ length: iot.length, iot: iot });
};

const processMeam = iots => {
  let temperature_ = 0;
  let humidity_ = 0;
  let co_ = 0;
  let smoke_ = 0;
  let lpg_ = 0;
  let s_ = 0;
  let n_ = 0;

  let temperature_c_ = 0;
  let humidity_c_ = 0;

  let w_ = 0;

  iots.forEach(iot => {
    const {
      temperature: temperature_c,
      humidity: humidity_c
    } = iot.current_weather;

    if (temperature_c && humidity_c) {
      temperature_c_ += temperature_c;
      humidity_c_ += humidity_c;
      w_ += 1;
    }

    const { temperature, humidity, toxic_gases } = iot.sensor;
    const { co, smoke, lpg } = toxic_gases;

    if (temperature && humidity) {
      temperature_ += temperature;
      humidity_ += humidity;
      s_ += 1;
    }
    if (co !== null && smoke != null && lpg != null) {
      co_ += co;
      smoke_ += smoke;
      lpg_ += lpg;
      n_ += 1;
    }
  });

  temperature_ /= s_;
  humidity_ /= s_;
  co_ /= n_;
  smoke_ /= n_;
  lpg_ /= n_;
  temperature_c_ /= w_;
  humidity_c_ /= w_;

  return {
    temperature_,
    humidity_,
    co_,
    smoke_,
    lpg_,
    temperature_c_,
    humidity_c_,
    data: iots[0]["data"]
  };
};
