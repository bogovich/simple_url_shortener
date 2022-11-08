import URL from "../models/urlModel.js";
import urlExist from "url-exist";
import { nanoid } from "nanoid";
import QRCode from "qrcode";
import { qrUpload } from "./s3.js";

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
      const qrData = await generateQrUploadData(shortUrl, urlId);
      const data = await qrUpload(qrData);
      const qrUrl = `${process.env.AWS_BASE}/${urlId}.png`;
      url = new URL({
        origUrl,
        shortUrl,
        urlId,
        qrUrl,
        date: new Date(),
      });
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

const generateQR = async (text) => {
  try {
    let qrUri = await QRCode.toDataURL(text);
    return qrUri;
  } catch (error) {
    console.error(error);
  }
};

const generateQrUploadData = async (shortUrl, urlId) => {
  const qrUri = await generateQR(shortUrl);
  const qrBuffer = Buffer.from(
    qrUri.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const qrData = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${urlId}.png`,
    Body: qrBuffer,
  };
  return qrData;
};

export { shortenUrl, redirectURL };
