const Game = require('../models/game');
const Publisher = require('../models/publisher');
const Genre = require('../models/genre');

const asyncHandler = require("express-async-handler");

// Display list of all genres
exports.genre_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: genre List");
});

// Display detail page for a specific genre
exports.genre_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: genre detail: ${req.params.id}`);
});

// Display book create form on GET
exports.genre_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED! genre create GET');
});

// Handle genre create on POST
exports.genre_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED! genre create POST");
});

// Display genre delete form on GET
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED! genre delete GET');
});

// Handle genre delete on POST
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED! genre delete POST");
});

// Display genre update form on GET
exports.genre_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED! genre update GET');
});

// Handle genre update on POST
exports.genre_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED! genre update POST");
});