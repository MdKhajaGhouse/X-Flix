const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const videoService = require('../services/video.service');

const getVideos = catchAsync(async (req, res) => {
    const {genres, title, contentRating, sortBy} = req.query

    const videos = await videoService.getAllVideos(genres, title, contentRating, sortBy);

    res.status(httpStatus.OK).send({
        'videos': videos,
    });
});

const getVideoById = catchAsync(async (req, res) => {

    const {videoId} = req.params;

    const video = await videoService.getVideoById(videoId);

    if (video == null) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No video found with matching id');
    } else {
        res.status(httpStatus.OK).send(video);
    }

});

const postVideo = catchAsync(async (req, res) => {
    const body = req.body;
    const video = await videoService.createVideo(body);

    res.status(httpStatus.CREATED).send(video);
});

const updateVotes = catchAsync(async (req, res) => {
    const {vote, change} = req.body;
    const {videoId} = req.params;

    const changeBy = (change == 'increase') ? 1 : -1;

    if (vote == 'upVote') {
        await videoService.updateVideoUpVoteBy(videoId, changeBy);
    } else {
        await videoService.updateVideoDownVoteBy(videoId, changeBy);
    }
    
    res.status(httpStatus.NO_CONTENT).send();
});

const incrementViews = catchAsync(async (req, res) => {
    const {videoId} = req.params;

    await videoService.incrementVideoView(videoId);

    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    getVideos,
    getVideoById,
    postVideo,
    updateVotes,
    incrementViews,
}