var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
const {passport} = require('../admin/admin-auth');

const storage = multer.diskStorage({
    destination: './public/training-videos',
    filename: (req, file,cb) => {
        cb(null,file.filename + '-' + Date.now() + '-' +file.originalname);
    }
});

const upload = multer({storage: storage});

const jwtAdminAuth = (req, res, next) => {
    passport.authenticate('admin-jwt', {session:false} ,(err, token) => {
        if(err){
            res.token = null;
            res.error = err;
            next();
        }
        else {
            res.token = token;
            next();
        }
    })(req, res, next);
};

router.get('/:id', (req, res) => {
    const path = './public/training-videos/' + req.params.id;
    let stat;
    try {
        stat = fs.statSync(path);
    }
    catch(e) {
        throw e
    }
    const fileSize = stat.size;
    const range = req.headers.range;

    if(range){
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1;

        const chunksize = (end-start)+1;
        const file = fs.createReadStream(path, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, head);
        file.pipe(res)
    }
    else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res)
    }

});

router.post('/addVideo', [jwtAdminAuth, upload.single('file')], (req, res) => {
    if(res.token && !res.error){
        res.status(200).send( req.file.filename);
    }
    else {
        res.status(401).send(res.error);
    }
});

module.exports = router;
