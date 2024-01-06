const Game = require('../models/game');
const Publisher = require('../models/publisher');
const Genre = require('../models/genre');

const asyncHandler = require("express-async-handler");

// Display list of all publishers
exports.publisher_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: publisher List");
});

// Display detail page for a specific publisher
exports.publisher_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: publisher detail: ${req.params.id}`);
});

// Display book create form on GET
exports.publisher_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED! publisher create GET');
});

// Handle publisher create on POST
exports.publisher_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED! publisher create POST");
});

// Display publisher delete form on GET
exports.publisher_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED! publisher delete GET');
});

// Handle publisher delete on POST
exports.publisher_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED! publisher delete POST");
});

// Display publisher update form on GET
exports.publisher_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED! publisher update GET');
});

// Handle publisher update on POST
exports.publisher_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED! publisher update POST");
});