const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  title: { type: String, required: true },
  publisher: { type: Schema.Types.ObjectId, ref: "Publisher", required: true },
  release_date: { type: Date },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }]
});

// virtual for game's url
GameSchema.virtual("url").get(function() {
  return `/catalog/game/${this._id}`;
});

module.exports = mongoose.model("Game", GameSchema);