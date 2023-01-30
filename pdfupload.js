const multer = require ('multer')


const pdf = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'public/pdf/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname)
    },
    fileFilter: function(req, file, callback) {
        if(
            file.mimetype == "pdf/docx" || 
            file.mimetype == "pdf/pdf" ||
            file.mimetype == "pdf/txt"
            ){
                callback(null,true)
            } else{
                res.status(501).send('only docx, pdf & txt file is supported')
                callback(null, false)
            }
    },
    limits: {
        fileSize: 1024*1024*2
    }
})
const pdfupload = multer({storage: pdf})


const image = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'public/image/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname)
    },
    fileFilter: function(req, file, callback) {
        if(
            file.mimetype == "image/png" || 
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
            ){
                callback(null,true)
            } else{
                res.status(501).send('only jpg, png & jpeg file is supported')
                callback(null, false)
            }
    },
    limits: {
        fileSize: 1024*1024*2
    }
})

const imageupload = multer({storage: image})

module.exports = {
    pdfupload,
    imageupload
}