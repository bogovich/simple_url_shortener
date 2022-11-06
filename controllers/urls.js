import URL from "../models/urlModel.js";
import urlExist from "url-exist";
import { nanoid } from "nanoid";

const shortenUrl = async (req, res) => {
  const { origUrl } = req.body;

  const exists = await urlExist(origUrl);

  if (!exists) {
    return res.status(401).json("Invalid URL");
  }
  try {
    let url = await URL.findOne({ origUrl });

    if (url) {
      res.json(url);
    } else {
      const urlId = nanoid(7);
      const shortUrl = `${process.env.BASE}/${urlId}`;
      url = new URL({ origUrl, shortUrl, urlId, date: new Date() });
      await url.save();
      res.json(url);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};

const redirectURL = async (req, res) => {
  const urlId = req.params.urlId;
  try {
    const url = await URL.findOne({ urlId });
    if (url) {
      await URL.updateOne({ urlId: urlId }, { $inc: { hits: 1 } });
      return res.redirect(url.origUrl);
    } else {
      console.log(urlId);
      res.status(404).json(`NOT FOUND`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
};

/*
const redirectOrCreate = async (req, res) => {
  const { urlId } = req.params.urlId;
  const exists = await urlExist(urlId);
  if (!exists) {
    redirectURL(req, res, urlId);
  }

  shortenUrl;
};
*/

export { shortenUrl, redirectURL };
