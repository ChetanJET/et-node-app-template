const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const envFile = process.env.NODE_ENV === 'development' ? '.env.dev' : '.env'

dotenv.config({ path: envFile })

const ErrorMiddleware = require('./src/middleware/ErrorMiddleware')

const app = express()

app.use(
  cors({
    origin: [process.env.APP_URL, process.env.ADMIN_URL],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
  }),
)
app.options('*', cors())
app.use(morgan('dev'))
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(ErrorMiddleware)

module.exports = { app }
