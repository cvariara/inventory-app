const Game = require('../models/game');
const Publisher = require('../models/publisher');
const Genre = require('../models/genre');

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  // get details of books, book instances, authors and genre counts
  const [
    numGames,
    numPublishers,
    numGenres,
  ] = await Promise.all([
    Game.countDocuments({}).exec(),
    Publisher.countDocuments({}).exec(),
    Genre.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Game Express Home",
    game_count: numGames,
    publisher_count: numPublishers,
    genre_count: numGenres,
  });
});

// Display list of all games
exports.game_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Game List");
});

// Display detail page for a specific game
exports.game_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Game detail: ${req.params.id}`);
});

// Display game create form on GET
exports.game_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED! game create GET');
});

// Handle game create on POST
exports.game_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED! game create POST");
});

// Display game delete form on GET
exports.game_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED! game delete GET');
});

// Handle game delete on POST
exports.game_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED! game delete POST");
});

// Display game update form on GET
exports.game_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED! game update GET');
});

// Handle game update on POST
exports.game_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED! game update POST");
});