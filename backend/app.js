const express = require('express');
const httpStatus = require('http-status');
const routes = require('./routes/v1');
const validate = require("./middlewares/validate");
const videoController = require('./controllers/video.controller');
const videoValidation = require('./validations/video.validation');

const ApiError = require('./utils/ApiError');
const { errorConverter, errorHandler } = require('./middlewares/error');

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// handle routing
app.use('/v1', routes);

app.use('/video/:videoId', validate(videoValidation.videoById), videoController.getVideoById);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});
  
// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;