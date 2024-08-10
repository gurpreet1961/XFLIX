const {Video} = require("../model")

const getAllVideos = async () => {
    return await Video.find({}).exec();
};

const getVideoByFilters = async (queries) =>{
    const ageFilter = (contentRatingInput) => {
        const ratings = ["7+", "12+", "16+", "18+"];
        return contentRatingInput === "Anyone"
          ? ratings
          : ratings.filter((rating) => parseInt(rating) >= parseInt(contentRatingInput));
      };
    
      let chainedQuery = null;
  if (queries.title) {
    chainedQuery = Video.find({
      title: { $regex: queries.title, $options: "i" },
    });
  }
  if (queries.genres) {
    if (queries.genres === "All") {
      if (chainedQuery) chainedQuery = chainedQuery.find({});
      else chainedQuery = Video.find({});
    } else {
      genres = queries.genres.split(",");
      if (chainedQuery)
        chainedQuery = chainedQuery.find({ genre: { $in: genres } });
      else chainedQuery = Video.find({ genre: { $in: genres } });
      console.log(chainedQuery);
    }
  }

  if (queries.contentRating) {
    contentRatingInput = ageFilter(decodeURI(queries.contentRating));
    if (chainedQuery)
      chainedQuery = chainedQuery.find({
        contentRating: { $in: contentRatingInput },
      });
    else
      chainedQuery = Video.find({ contentRating: { $in: contentRatingInput } });
    console.log(chainedQuery);
  }
  if (queries.sortBy) {
    if (queries.sortBy === "viewCount") {
      if (chainedQuery)
        chainedQuery = chainedQuery
          .sort({ viewCount: -1 })
          .collation({ locale: "en_US", numericOrdering: true });
      else
        chainedQuery = Video.find({})
          .sort({ viewCount: -1 })
          .collation({ locale: "en_US", numericOrdering: true });
      console.log(chainedQuery);
    }
    if (queries.sortBy === "releaseDate") {
      let videoList = null;
      if (chainedQuery) videoList = await chainedQuery.exec();
      else videoList = await Video.find({}).exec();

      return videoList.sort((vid1, vid2) => {
        return new Date(vid2.releaseDate) - new Date(vid1.releaseDate);
      });
    }
  }
  return await chainedQuery.exec();}

const getVideoById = async (id) =>{
    return await Video.findOne({ _id: id });
}

const postVideo = async (video) => {
    return await Video.create(video);
};

const modifyVoteCount = async (id, body) => {
    let video = await Video.findOne({ _id: id });
    if (!video) return null;
    video.votes[(body.vote += "s")] += body.change == "increase" ? 1 : -1;
    await video.save();
    return video;
};

const modifyViewsCount = async (videoID) => {
    let video = await Video.findOne({ _id: videoID });
    if (!video) return null;
    video.viewCount += 1;
    await video.save();
    return video;
};


module.exports = {
  getAllVideos,
  getVideoByFilters,
  getVideoById,
  postVideo,
  modifyVoteCount,
  modifyViewsCount,
};