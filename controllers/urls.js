import URL from "../models/urlModel.js";
import urlExist from "url-exist";
import { nanoid } from "nanoid";
import QRCode from "qrcode";
import { qrUpload, qrDelete } from "./s3.js";

const shortenURL = async (req, res) => {
  const { origUrl } = req.body;

  const exists = await urlExist(origUrl);

  let author;
  if (req.user) {
    author = req.user.username;
  } else {
    author = "public";
  }
  //const author = req.user.username || "public";

  if (!exists) {
    return res.status(404).json("Invalid URL");
  }
  try {
    let url = await URL.findOne({ origUrl });

    if (url) {
      res.json(url);
    } else {
      const urlId = nanoid(6);
      const shortUrl = `${process.env.BASE}/${urlId}`;
      const qrData = await generateQrUploadData(shortUrl, urlId);
      const data = await qrUpload(qrData);
      const qrUrl = `${process.env.AWS_BASE}/${urlId}.png`;
      url = new URL({
        origUrl,
        shortUrl,
        urlId,
        qrUrl,
        date: new Date().toLocaleString(),
        createdBy: author,
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

const deleteURL = async (req, res) => {
  const { urlId } = req.body;

  let userAuth;
  if (req.user) {
    userAuth = req.user.username;
  } else {
    userAuth = "public";
  }
  try {
    const urlInfo = await URL.findOne({ urlId });

    if (urlInfo.createdBy === userAuth) {
      const delUrl = await URL.findOneAndDelete({ urlId });
      if (!delUrl) res.status(404).json(`MONGODB - NOT FOUND`);
      if (delUrl) {
        const qrDel = await qrDelete({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${urlId}.png`,
        });
        if (!qrDel) res.status(404).json(`AWS S3 - NOT FOUND`);
      }
      res.status(200).json({ delUrl });
    } else {
      res.status(401).json(`Not authorized to delete.`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

const getUserURLS = async (req, res) => {
  const { username } = req.body;
  try {
    const userURLS = await URL.find({ createdBy: username }).select(
      "urlId origUrl shortUrl hits qrUrl date -_id"
    );
    if (!userURLS.length) {
      returnres.status(404).json(`URLs made by ${username} not found.`);
    }
    if (userURLS.length) {
      res.json(userURLS);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

const localGetURLS = async (username) => {
  try {
    let userURLS = await URL.find({ createdBy: username }).select(
      "urlId origUrl shortUrl hits qrUrl date -_id"
    );
    return userURLS.length ? userURLS : [];
  } catch (error) {
    console.log(error);
  }
};

export { shortenURL, redirectURL, deleteURL, getUserURLS, localGetURLS };
