const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PublisherSchema = new Schema({
  name: { type: String, required: true },
  date_of_birth: { type: Date },
});

// virtual for game's url
PublisherSchema.virtual("url").get(function() {
  return `/catalog/publisher/${this._id}`;
});

module.exports = mongoose.model("Publisher", PublisherSchema);
