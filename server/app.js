const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())
models = require('/.models')

app.get('/api/getData', (req, res) => {
  models.NpReport.findAll().then(result => res.json(result))
  console.log(result)
  res.json({success: true, message:"Data is being populated..."})
}).catch(error => res.json({success: false, message:"ERROR: Data could not be populated..."}))


app.post('/api/reading', (req,res) => {
  let lat = req.body.lat
  let long = req.body.long
  let decibel = req.body.decibel
  console.log(lat)
  console.log(long)
  console.log(decibel)
  res.json({message: "Data was saved to database..."})
})


app.listen(PORT,function(){
  console.log("Server is running...")
})
