const mongoose = require('mongoose')

const connectDatabase = () => {
  mongoose.set('strictQuery', false)
  mongoose.connect(process.env.DATABASE_URI).then((data) => {
    console.log(`Mongodb Connected With Server: ${data.connection.host}`)
  })
}

module.exports = connectDatabase
