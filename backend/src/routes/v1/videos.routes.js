const express = require("express");
const videoController = require("../../controller/videos.controller");

const router = express.Router();

router.get("/", videoController.getVideos);
router.post("/", videoController.postVideo);
router.get("/:videoID", videoController.getVideoByID);
router.patch("/:videoId/views", videoController.updateViews);
router.patch("/:videoId/votes", videoController.updateVotes );

module.exports = router;