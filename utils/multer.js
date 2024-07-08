import multer from "multer"

const storage = multer.diskStorage({
    destination: '/tmp',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.ext');
    }
});

const upload = multer({ storage: storage });

export default upload