const mongoose = require('mongoose')

const AbcSchema = new mongoose.Schema(
  {
    abc: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
)

module.exports = mongoose.model('abc', AbcSchema)
