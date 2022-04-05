import * as Express from "express"
import * as path from "path"
import * as logger from 'morgan'

import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');

const app = Express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(Express.static(path.join(__dirname, 'public/app')));

app.listen(3000, function () {
    console.log('meetznow.io is listening on port 3000!');
});

app.use('/', require("./routes/index"));
