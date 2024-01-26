const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const PublisherSchema = new Schema({
  name: { type: String, required: true },
  date_of_birth: { type: Date },
  image: { type: String }
});

// virtual for game's url
PublisherSchema.virtual("url").get(function() {
  return `/catalog/publisher/${this._id}`;
});

PublisherSchema.virtual("date_of_birth_formatted").get(function() {
  return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});


module.exports = mongoose.model("Publisher", PublisherSchema);
