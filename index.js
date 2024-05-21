const dotenv = require('dotenv')
const http = require('http')
const https = require('https')
const fs = require('fs')

const { app } = require('./app')
const connectDatabase = require('./src/config/database')

const envFile = process.env.NODE_ENV === 'development' ? '.env.dev' : '.env'

dotenv.config({ path: envFile })

// database
connectDatabase()

const server = http.createServer(app)

// https server
let server2
if (process.env.NODE_ENV !== 'development') {
  const httpsOptions = {
    key: '',
    cert: '',
  }
  server2 = https.createServer(httpsOptions, app)

  server2.listen(process.env.HTTPS_PORT, () => {
    console.log(
      `Server is working on https://${process.env.HTTPS_PORT} ${process.env.NODE_ENV}`,
    )
  })
}

// server handle
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`)
  console.log(`Shutting down the server due to Uncaught Exception`)
  process.exit(1)
})

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`)
  console.log(`Shutting down the server due to Unhandled Promise Rejection`)

  server.close(() => {
    process.exit(1)
  })
})

server.listen(process.env.HTTP_PORT, () => {
  console.log(
    `Server is working on http://localhost:${process.env.HTTP_PORT} ${process.env.NODE_ENV}`,
  )
})
