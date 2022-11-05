import URL from "../models/urlModel.js";
import urlExist from "url-exist";
import { nanoid } from "nanoid";

const shortenUrl = async (req, res) => {
  const { origUrl } = req.body;

  const exists = await urlExist("https://google.com");

  if (!exists) {
    return res.status(401).json("Invalid base URL");
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

export { shortenUrl };
