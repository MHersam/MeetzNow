"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const router = Express.Router();
router.get('/', async function (req, res, next) {
    try {
        res.sendFile('index.html', { root: __dirname + '../public/app' });
    }
    catch (err) {
        next(err);
    }
});
module.exports = router;
