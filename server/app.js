const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 8080


app.listen(PORT,function(){
  console.log("Server is growing...")
})
