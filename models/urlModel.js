import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  urlId: {
    type: String,
    required: true,
  },
  origUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  hits: {
    type: Number,
    required: true,
    default: 0,
  },
  qrUrl: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
  createdBy: {
    type: String,
    default: "public",
  },
});

export default mongoose.model("Url", UrlSchema);
