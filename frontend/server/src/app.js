"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require('cors')
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public/app')));
app.use('/', require("../routes/index.js"));
app.get('/login', (req, res) => {
    res.send(
      [
        {
        title: "Hello World!",
        description: "Hi there! How are you?"
      }
    ]
    )
  })
app.listen(3000, function () {
    console.log('meetznow.io is listening on port 3000!');
});
