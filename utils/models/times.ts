import mongoose from 'mongoose'

const TimesSchema = new mongoose.Schema({
  name: String,
  starttime: Number,
  endtime: Number,
  comments: String
})

export default mongoose.models.times || mongoose.model('times', TimesSchema);