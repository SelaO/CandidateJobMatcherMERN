let mongoose = require('mongoose');
const entitiesEnum = require('./entitiesEnum');

let candidateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
    index: true,
  },
  skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: entitiesEnum.SKILL
    }
  ]
})

module.exports = mongoose.model(entitiesEnum.CANDIDATE, candidateSchema)