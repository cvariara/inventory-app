const Game = require('../models/game');
const Publisher = require('../models/publisher');
const Genre = require('../models/genre');

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const path = require('path');
const multer = require('multer');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
  	const fileExtention = file.originalname.split('.')[1];
    const fileName = `${Math.round(Math.random() * 1E9)}.${fileExtention}`; //Randomize filename to avoid same-name errors
	cb(null,fileName);
  }
});
// Filters to Image Only
const upload = multer({storage:storage,fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }, limits: { fileSize: 2000000 }}); // limit imgage upload to 2MB

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
  const allGames = await Game.find({}, "title publisher image")
    .collation({ locale: 'en', strength: 2 })
    .sort({ title: 1 })
    .populate("publisher")
    .exec();

  res.render("game_list", {
    title: "List of Games",
    game_list: allGames
  });
});

// Display detail page for a specific game
exports.game_detail = asyncHandler(async (req, res, next) => {
  const game = await Game.findById(req.params.id)
    .populate("publisher")
    .populate("genre")
    .exec();

    if (game === null) {
      // No results.
      const err = new Error("Game not found");
      err.status = 404;
      return next(err);
    }

    res.render("game_detail", {
      title: game.title,
      game: game
    });
});

// Display game create form on GET
exports.game_create_get = asyncHandler(async (req, res, next) => {
  const [allPublishers, allGenres] = await Promise.all([
    Publisher.find()
      .collation({ locale: 'en', strength: 2 })
      .sort({ name: 1 })
      .exec(),
    Genre.find()
      .collation({ locale: 'en', strength: 2 })
      .sort({ name: 1 })
      .exec()
  ]);

  res.render("game_form", {
    title: 'Create Game',
    publishers: allPublishers,
    genres: allGenres
  });
});

// Handle game create on POST
exports.game_create_post = [
  upload.single('image'),

  // convert genre to array
  (req, res, next) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre = typeof req.body.genre === "undefined" ? [] : [req.body.genre];
    }
    next();
  },

  // validate and sanitize fields
  body("title", "Title must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("publisher", "Publisher must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("genre.*").escape(),

  // process req after validation and sanitization
  asyncHandler(async (req, res, next) => {
    // extract validation errors from request
    const errors = validationResult(req);

    const game = new Game({
      title: req.body.title,
      publisher: req.body.publisher,
      release_date: req.body.release_date,
      genre: req.body.genre,
      image: req.file ? req.file.filename : null,
    });

    if (!errors.isEmpty()) { // There are errors
      const [allPublishers, allGenres] = await Promise.all([
        Publisher.find()
          .collation({ locale: 'en', strength: 2 })
          .sort({ name: 1 })
          .exec(),
        Genre.find()
          .collation({ locale: 'en', strength: 2 })
          .sort({ name: 1 })
          .exec()
      ]);

      for (const genre of allGenres) {
        if (game.genre.includes(genre._id)) {
          genre.checked = "true";
        }
      }
    
      res.render("game_form", {
        title: 'Create Game',
        publishers: allPublishers,
        genres: allGenres,
        game: game,
        errors: errors.array(),
      });
    } else {
      // Save game
      await game.save();
      res.redirect(game.url);
    }
  })
];

// Display game delete form on GET
exports.game_delete_get = asyncHandler(async (req, res, next) => {
  const game = await Game.findById(req.params.id).exec();

  if (game === null) {
    const err = new Error("Game not found");
    err.status = 404;
    res.redirect("/catalog/games");
  }

  res.render("game_delete", {
    title: "Delete Game",
    game: game,
  });
});

// Handle game delete on POST
exports.game_delete_post = asyncHandler(async (req, res, next) => {
  const game = await Game.findById(req.params.id).exec();
  
  await Game.findByIdAndDelete(req.body.gameid);
  res.redirect("/catalog/games");
});

// Display game update form on GET
exports.game_update_get = asyncHandler(async (req, res, next) => {
  const [game, allPublishers, allGenres] = await Promise.all([
    Game.findById(req.params.id).populate("publisher").exec(),
    Publisher.find().sort({ name: 1 }).exec(),
    Genre.find().sort({ name: 1 }).exec(),
  ]);

  if (game === null) {
    const err = new Error("Game not found");
    err.status = 404;
    res.redirect("/catalog/games");
  }

  // Mark our selected genres as checked.
  allGenres.forEach((genre) => {
    if (game.genre.includes(genre._id)) genre.checked = "true";
  });

  res.render("game_form", {
    title: "Update Game",
    publishers: allPublishers,
    genres: allGenres,
    game: game,
  });
});

// Handle game update on POST
exports.game_update_post = [
  upload.single('image'),

  // convert genre to array
  (req, res, next) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre = typeof req.body.genre === "undefined" ? [] : [req.body.genre];
    }
    next();
  },

  // validate and sanitize fields
  body("title", "Title must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("publisher", "Publisher must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("genre.*").escape(),

  // process req after validation and sanitization
  asyncHandler(async (req, res, next) => {
    // extract validation errors from request
    const errors = validationResult(req);

    const game = new Game({
      title: req.body.title,
      publisher: req.body.publisher,
      release_date: req.body.release_date,
      genre: typeof req.body.genre === "undefined" ? [] : req.body.genre,
      image: req.file ? req.file.filename : null,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) { // There are errors
      const [allPublishers, allGenres] = await Promise.all([
        Publisher.find()
          .collation({ locale: 'en', strength: 2 })
          .sort({ name: 1 })
          .exec(),
        Genre.find()
          .collation({ locale: 'en', strength: 2 })
          .sort({ name: 1 })
          .exec()
      ]);

      for (const genre of allGenres) {
        if (game.genre.includes(genre._id)) {
          genre.checked = "true";
        }
      }
    
      res.render("game_form", {
        title: 'Update Game',
        publishers: allPublishers,
        genres: allGenres,
        game: game,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Update the record.
      const updatedGame = await Game.findByIdAndUpdate(req.params.id, game, {});
      // Redirect to game detail page.
      res.redirect(updatedGame.url);
    }
  })
];