const express = require('express')
require('dotenv').config()

const database = require('./config/database')
database.connect()

const clientRoute = require('./routes/client/index.route')
const adminRoute = require('./routes/admin/index.route')

const systemConfig = require('./config/system')

const app = express()
const port = process.env.PORT

app.use(express.static('public'))

app.set('view engine', 'pug')
app.set('views', './views')

//App locals variables
app.locals.prefixAdmin = systemConfig.prefixAdmin

//Routes  
clientRoute(app)
adminRoute(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
