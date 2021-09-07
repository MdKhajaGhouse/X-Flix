const mongoose = require('mongoose');
const config = require('../config/config');

const videoSchema = mongoose.Schema({
    videoLink: {
        type: String,
        required: true,
        // validate: {
        //     validator:  (value) => {
        //         const arr = value.split('/');
        //         const domain = arr[0];
        //         const embed = arr[1];
        //         const videoId = arr[2];

        //         if (domain != 'youtube.com' || embed != 'embed'){
        //             return false;
        //         }

        //         // TODO: how to validate the videoId?

        //       return true;
        //     },
        //     message: props => `${props.value} is not a valid video link!`
        //   },
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: String,
        required: true,
    },
    contentRating: {
        type: String,
        required: true,
        enum: [config.ratings_7_plus, config.ratings_12_plus, config.ratings_16_plus, config.ratings_18_plus],
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    previewImage: {
        type: String,
        required: true,
    },
    votes: {
        type: {
            upVotes: Number,
            downVotes: Number,
        },
        required: true,
        default: config.default_votes,
    },
    viewCount: {
        type: Number,
        required: true,
        default: config.default_view_count,
    }
});

/**
 * @typedef Video
 */
const Video = mongoose.model('Video', videoSchema);

module.exports.Video = Video;