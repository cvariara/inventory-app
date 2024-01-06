const express = require('express');
const router = express.Router();

const game_controller = require('../controllers/gameController');
const genre_controller = require('../controllers/genreController');
const publisher_controller = require('../controllers/publisherController');

/* GAME ROUTES */
router.get("/", game_controller.index);

// get and post for creating a game
router.get("/game/create", game_controller.game_create_get);

router.post("/game/create", game_controller.game_create_post);

// get and post for deleting a game by id
router.get("/game/:id/delete", game_controller.game_delete_get);

router.post("/game/:id/delete", game_controller.game_delete_post);

// get and post for updating a game by id
router.get("/game/:id/update", game_controller.game_update_get);

router.post("/game/:id/update", game_controller.game_update_post);

// get for one game
router.get("/game/:id", game_controller.game_detail);

// get for all games
router.get("/games", game_controller.game_list);

/* GENRE ROUTES */
// get and post for creating a genre
router.get("/genre/create", genre_controller.genre_create_get);

router.post("/genre/create", genre_controller.genre_create_post);

// get and post for deleting a genre by id
router.get("/genre/:id/delete", genre_controller.genre_delete_get);

router.post("/genre/:id/delete", genre_controller.genre_delete_post);

// get and post for updating a genre by id
router.get("/genre/:id/update", genre_controller.genre_update_get);

router.post("/genre/:id/update", genre_controller.genre_update_post);

// get for one genre
router.get("/genre/:id", genre_controller.genre_detail);

// get for all genres
router.get("/genres", genre_controller.genre_list);

/* PUBLISHER ROUTES */
// get and post for creating a publisher
router.get("/publisher/create", publisher_controller.publisher_create_get);

router.post("/publisher/create", publisher_controller.publisher_create_post);

// get and post for deleting a publisher by id
router.get("/publisher/:id/delete", publisher_controller.publisher_delete_get);

router.post("/publisher/:id/delete", publisher_controller.publisher_delete_post);

// get and post for updating a publisher by id
router.get("/publisher/:id/update", publisher_controller.publisher_update_get);

router.post("/publisher/:id/update", publisher_controller.publisher_update_post);

// get for one publisher
router.get("/publisher/:id", publisher_controller.publisher_detail);

// get for all publishers
router.get("/publishers", publisher_controller.publisher_list);

module.exports = router;