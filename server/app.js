const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const moment = require('moment')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())

models = require('./models')


app.get('/api/getData', (req, res) => {
  models.NpReport.findAll().then(results => {
    let featureCollection = geojsonConversion(results)
    res.json(featureCollection)
  }).catch(error => res.json({message: false, error: error}))
})

app.get('/api/getDecibelThreshold', (req,res) => {
  models.NpReport.findAll({
    where: {
    decibel: {
      [Op.gte]: 85
      }
    }
  }).then(results => {
    let featureCollection = geojsonConversion(results)
    res.json(featureCollection)
  })
})

app.get('/api/getPastTwentyFourHoursData', (req,res) => {
  models.NpReport.findAll({
    where: {
      createdAt: {
        [Op.gte]: moment().subtract(1, 'days').toDate()
      }
    }
  }).then(results => {
    let featureCollection = geojsonConversion(results)
    res.json(featureCollection)
  })
})


app.post('/api/reading', (req,res) => {
  let latitude = parseFloat(req.body.latitude)
  let longitude = parseFloat(req.body.longitude)
  let decibel = parseFloat(req.body.decibel)
  let reading = models.NpReport.build({
    latitude: latitude,
    longitude: longitude,
    decibel: decibel
  })
  reading.save().then(reading => {
    res.json({success:true, message:"Decibel reading was saved to database."})
  }).catch(error => {
    res.json({sucess: false, message:"Reading could not be saved", error: error})
  })
})

geojsonConversion = (array) => {
  let features = []
  array.forEach(result => {
    let id = result.id
    let decibel = result.decibel
    let longitude = result.longitude
    let latitude = result.latitude
    let time = result.createdAt
    let feature = {
      type: "Feature",
      properties: {
        id: id,
        decibel: decibel,
        time: time
      },
      geometry: {
        type: "Point",
        coordinates: [
          longitude,
          latitude
        ]
      }
    }
    features.push(feature)
  })
  let featureCollection = {
    type: "FeatureCollection",
    crs: {
      type: "name",
      properties: {
        name: "urn:ogc:def:crs:OGC:1.3:CRS84"
      },
    },
    features: features
  }
  return featureCollection
}


app.listen(PORT,function(){
  console.log("Server is running...")
})
