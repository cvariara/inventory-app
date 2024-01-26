const Game = require('../models/game');
const Publisher = require('../models/publisher');
const Genre = require('../models/genre');

const asyncHandler = require("express-async-handler");

// Display list of all publishers
exports.publisher_list = asyncHandler(async (req, res, next) => {
  const allPublishers = await Publisher.find({}, "name image")
    .collation({ locale: 'en', strength: 2 })
    .sort({ name: 1 })
    .exec();

  res.render("publisher_list", {
    title: "List of Publishers",
    publisher_list: allPublishers
  });
});

// Display detail page for a specific publisher
exports.publisher_detail = asyncHandler(async (req, res, next) => {
  const [publisher, allGamesByPublisher] = await Promise.all([
    Publisher.findById(req.params.id).exec(),
    Game.find({ publisher: req.params.id }, "title image").sort({ title: 1 }).exec(),
  ]);

  if (publisher === null) {
    // No results.
    const err = new Error("Publisher not found");
    err.status = 404;
    return next(err);
  }

  res.render("publisher_detail", {
    title: publisher.name,
    publisher: publisher,
    publisher_games: allGamesByPublisher
  });
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