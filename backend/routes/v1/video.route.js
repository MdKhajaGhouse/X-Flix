const express = require('express');
const validate = require("../../middlewares/validate");
const videoController = require('../../controllers/video.controller');
const videoValidation = require('../../validations/video.validation');

const router = express.Router();

// Return all available videos
router.get('/', validate(videoValidation.filterVideoByParams), videoController.getVideos);

// Create a new video object
router.post('/', validate(videoValidation.videoUpload), videoController.postVideo);

// Update upVote or downVote value by 1 for a video
router.patch('/:videoId/votes', validate(videoValidation.videoById), videoController.updateVotes);

// Increase the viewCount value of a video by 1
router.patch('/:videoId/views', validate(videoValidation.videoById), videoController.incrementViews);

// Get the video object for a specific video
router.get('/:videoId', validate(videoValidation.videoById), videoController.getVideoById);

module.exports = router;