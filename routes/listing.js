const express = require("express");
const router = express.Router();
const wrapAsync = require("../init/wrapAsync.js");
const { isLoggedIn, isOwner, validtelisting } = require("../middleware.js");
const { index, CreateRoute, ShowRoute, EditRoute, UpdateRoute, DeleteRoute } = require("../controller/listing.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50 MB
});

// INDEX + CREATE
router.route("/")
  .get(wrapAsync(index)) // Index route
  .post(
    isLoggedIn,
    upload.fields([
      { name: "listing[image]", maxCount: 1 },
      { name: "song", maxCount: 1 }   // 🎵 added song field
    ]),
    validtelisting,
    wrapAsync(CreateRoute)
  );

// NEW Route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new");
});

// SHOW + UPDATE + DELETE
router.route("/:id")
  .get(wrapAsync(ShowRoute)) // Show Route
  .put(
    isLoggedIn,
    isOwner,
    upload.fields([
      { name: "listing[image]", maxCount: 1 },
      { name: "song", maxCount: 1 }   // 🎵 also allow updating song
    ]),
    validtelisting,
    wrapAsync(UpdateRoute)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(DeleteRoute));

// EDIT Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(EditRoute));

module.exports = router;
