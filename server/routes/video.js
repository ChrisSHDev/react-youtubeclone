const express = require('express');
const router = express.Router();
//const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");

//const path = require("path");

var path = require('path');

var appRoot = path.resolve("./");

console.log(appRoot);

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, appRoot + "/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.pdf') {
      return cb(res.status(400).end('only mp4 is allowed'), false);
    }
    cb(null, true)

  }
});

const upload = multer({ storage: storage }).single("file");
//=================================
//             video
//=================================

router.post('/uploadfiles', (req, res) => {

  upload(req, res, err => {
    if (err) {
      return res.json({ success: false, err })
    }
    return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
  });

})

module.exports = router;