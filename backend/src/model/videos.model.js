const mongoose = require("mongoose");

const videoSchema = mongoose.Schema(
  {
    contentRating: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    previewImage: {
      type: String,
      required: true,
      trim: true,
    },
    releaseDate: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    videoLink: {
      type: String,
      required: true,
      trim: true
    },
    viewCount: {
      type: Number,
      default: 0
    },
    votes: {
      upVotes: {
          type: Number,
          default: 0
      },
      downVotes: {
          type: Number,
          default: 0
      } 
    }
  },
  {
    timestamps: false,
  }
);

module.exports.Video = mongoose.model("Videos", videoSchema);