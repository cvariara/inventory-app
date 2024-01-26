const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  title: { type: String, required: true },
  publisher: { type: Schema.Types.ObjectId, ref: "Publisher", required: true },
  release_date: { type: Date },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
  image: { type: String, required: true } 
});

// virtual for game's url
GameSchema.virtual("url").get(function() {
  return `/catalog/game/${this._id}`;
});

GameSchema.virtual("imgurl").get(function() {
  return `/images/${this.image}`;
});

GameSchema.virtual("release_date_formatted").get(function() {
  return this.release_date ? DateTime.fromJSDate(this.release_date).toLocaleString(DateTime.DATE_MED) : '';
});

GameSchema.virtual("release_date_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.release_date).toISODate(); // format 'YYYY-MM-DD'
});

module.exports = mongoose.model("Game", GameSchema);