﻿# [URL Shortener](https://url-short-m6r5.onrender.com/)

## Project Description
Frontend: HTML, CSS
Backend: Node.js


Generated QR Code is hosted on AWS S3.
Registered and authenticated users have an overview of all their URLS they shortened while being logged in.
Session based authentication solved with passportjs, sessions hosted on MongoDB.
Deployed on render.com. 

Dependencies
    "@aws-sdk/client-s3": "^3.204.0",
    "bcrypt": "^5.1.0",
    "connect-flash": "^0.1.1",
    "connect-mongo": "^4.6.0",
    "cookie-parser": "^1.4.6",
    "dotenv": "^16.0.3",
    "ejs": "^3.1.8",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "joi": "^17.7.0",
    "mongodb": "^4.1.0",
    "mongoose": "^6.7.1",
    "morgan": "^1.10.0",
    "nanoid": "^4.0.0",
    "node-json2html": "^2.2.2",
    "passport": "^0.6.0",
    "passport-local": "^1.0.0",
    "qrcode": "^1.5.1",
    "toad-scheduler": "^2.0.0",
    "url-exist": "^3.0.1",
    "validator": "^13.7.0"



