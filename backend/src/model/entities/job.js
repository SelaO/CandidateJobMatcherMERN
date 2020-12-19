const mongoose = require('mongoose')
const entitiesEnum = require('./entitiesEnum');

let jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  skill: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: entitiesEnum.SKILL
    }
})

module.exports = mongoose.model(entitiesEnum.JOB, jobSchema)