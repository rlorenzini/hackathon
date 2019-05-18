const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())

models = require('./models')


app.get('/api/getData', (req, res) => {
  models.NpReport.findAll().then(result => {
  res.json({success: true, message:"Data is being populated...", result: result})
}
}).catch(error => res.json({success: false, message:"ERROR: Data could not be populated..."}))
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


app.listen(PORT,function(){
  console.log("Server is running...")
})
