const axios = require("axios");
const constrants = require("./../bin/constants");
const Iot = require("../models/iot");
exports.post = ("/",
async (req, res, next) => {
  try {
    const { lat, lon, speed, sensor } = req.body;
    const data = new Date();
    console.log(data);

    const wheater = await axios.get(constrants.current_weather);

    const name = wheater.data.name;
    const state = wheater.data.state;
    const country = wheater.data.country;
    const current_weather = wheater.data.data;

    const flowData = await axios.get(
      constrants.flow_segment.replace(":LAT", lat).replace(":LOG", lon)
    );

    const {
      frc,
      currentSpeed,
      freeFlowSpeed,
      currentTravelTime,
      freeFlowTravelTime,
      confidence
    } = flowData.data.flowSegmentData;

    const flowSegmentData = {
      frc,
      currentSpeed,
      freeFlowSpeed,
      currentTravelTime,
      freeFlowTravelTime,
      confidence
    };

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

    await iot.save();
    console.log(iot);
    res.send(iot);
    console.log("saved!");
  } catch (e) {
    console.log({ error: e });
    res.send({ error: e });
  }
});

exports.test = (req, res, next) => {
  console.log("ok");
  res.send({ ok: "ok" });
};

exports.get = async (req, res, next) => {
  const data = await Iot.find({}).sort([["data", "descending"]]);
  res.send(data);
};
