# [URL Shortener](https://url-short-m6r5.onrender.com/)

## Project Description

Simple URL shortener with QR generator for shortened links.

Frontend: HTML, CSS
Backend: Node.js

As a public user:
- Generate shortened URL with corresponding QR code
- Delete current shortened URL
- Copy shortened URL to clipboard
- Register as a user
- Login as a user

As a private user:
- Overview of all URLs shortened while logged in
- Generate shortened URL with corresponding QR code
- Delete current shortened URL
- Copy shortened URL to clipboard

Session-based authentication and authorization using PassportJS, sessions are hosted on MongoDB.

Generated QR Code is hosted on AWS S3.

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



