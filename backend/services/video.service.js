const {Video} = require('../models/video.model');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

/**
 * returns back all the available videos
 * @returns {Promise<List<Video>>}
 */
const getAllVideos = async (genres, title, contentRating, sortBy) => {
    const filter = {};

    if (genres != null) {
        genres = genres.split(',');
        filter.genre = {$in: genres};
    }

    if (title != null) {
        filter.title = {$regex: title, $options: 'i'}
    }

    if (contentRating != null) {
        let ratings = config.ratings;
        let indexOfRating = ratings.indexOf(contentRating);
        
        // if we have a valid rating
        if(indexOfRating != -1){
            let ratingsSubset = ratings.splice(0, indexOfRating + 1);
            console.log(ratingsSubset);
            filter.contentRating = {$in: ratingsSubset};
        }

    }

    if (sortBy == null || sortBy == 'releaseDate') {
        // by default, sortBy release date
        // TODO: WE HAVE A BUG HERE WITH DATES, NEEDS TO BE FIXED
        return Video.find(filter).sort({'releaseDate': -1});

    } else {
        // sort by viewCount
        return Video.find(filter).sort({'viewCount': -1});
    }
}

/**
 * returns back a single video object, recognized by it's Id
 * @param {ObjectId} videoId
 * @returns {Promise<Video>}
 */
const getVideoById = async (videoId) => {
    const video = await Video.findOne({'_id': videoId});
    if(video == null) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No video found with matching id');
    } else {
        return video;
    }
}

/**
 * creates a new video object from the request body
 * @param {Object} body
 * @returns {Promise<Video>}
 */
const createVideo = async (body) => {
    const video = await Video.create(body);
    return video;
}

/**
 * updates up vote of a video
 * @param {ObjectId} videoId
 * @param {Number} changeBy
 * @returns {Promise}
 */
const updateVideoUpVoteBy = async (videoId, changeBy) => {
    const video = await getVideoById(videoId);
    video.votes = {
        upVotes: video.votes.upVotes + changeBy,
        downVotes: video.votes.downVotes,
    };
    await video.save();
}

/**
 * updates down vote of a video
 * @param {ObjectId} videoId
 * @param {Number} changeBy
 * @returns {Promise}
 */
const updateVideoDownVoteBy = async (videoId, changeBy) => {
    const video = await getVideoById(videoId);
    video.votes = {
        upVotes: video.votes.upVotes,
        downVotes: video.votes.downVotes + changeBy,
    };
    await video.save();
}

/**
 * increments the views of a particular video
 * @param {ObjectId} videoId
 * @returns {Promise}
 */
const incrementVideoView = async (videoId) => {
    const video = await getVideoById(videoId);
    video.viewCount += 1;
    await video.save();
}

module.exports = {
    getAllVideos,
    getVideoById,
    createVideo,
    updateVideoDownVoteBy,
    updateVideoUpVoteBy,
    incrementVideoView,
}