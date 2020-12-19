let mongoose = require('mongoose')
const entitiesEnum = require('./entitiesEnum');

let skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  candidates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: entitiesEnum.CANDIDATE
    }
  ]
})

module.exports = mongoose.model(entitiesEnum.SKILL, skillSchema)