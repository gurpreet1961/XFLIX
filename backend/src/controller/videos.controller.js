const httpStatus = require("http-status");
const { videoService } = require("../service");
const catchAsync = require("../utils/catchAsync")


const getVideos = catchAsync(async (req, res) => {
  const { query } = req;
  
    const videos = Object.keys(query).length
      ? await videoService.getVideoByFilters(query)
      : await videoService.getAllVideos();
  
    res.status(200).send({ videos });
});

const getVideoByID = catchAsync(async (req, res) => {
    const video = await videoService.getVideoById(req.params.videoID);
  
    if (video) {
      res.status(200).send(video);
    } else {
      res.status(404).send("No Video found with id: "+req.params.videoID);
    }
});
  
const postVideo = catchAsync(async (req, res) => {
    const video = await videoService.postVideo(req.body);
    return res.status(httpStatus.CREATED).send(video);
});

const updateVotes = catchAsync(async (req, res) => {
    try {
      const video = await videoService.modifyVoteCount(req.params.videoId, req.body);
  
      if (video) {
        res.status(204).send();
      } else {
        res.status(404).send("No Video found with id: "+req.params.videoID);
      }
    } catch (error) {
        res.status(404).send(error);
    }
});

const updateViews = catchAsync(async (req, res) => {
    try {
      const video = await videoService.modifyViewsCount(req.params.videoId);
  
      if (video) {
        res.status(204).send();
      } else {
        res.status(404).send("No Video found with id: "+req.params.videoID);
      }
    } catch (error) {
      res.status(404).send(error);
    }
  });
  

  module.exports = {
    getVideos,
    getVideoByID,
    postVideo,
    updateVotes,
    updateViews,
  };