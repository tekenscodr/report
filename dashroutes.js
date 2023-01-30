const express = require('express')
const router = express.Router()
const conn = require('./db')
const { imageupload } = require('./pdfupload')
const path = require('path')

router.get("/",async(req, res) => {
    try {
        conn.query('SELECT * FROM reports', (err, result) => {
            if(err) throw err;
            res.status(200).render("dash", {data: result, user: req.session.name})
        })    
        console.log(req.session.loggedin)
    } catch (error) {
        
    }
})
router.get('/create', async(req, res) => {
    try {
 
        res.status(200).render("create")
    } catch (error) {
        
    }
})
router.post('/create', imageupload.single('file'), async(req, res) => {
    try {
     
        if(!req.file){
            console.log("upload image please!!")
         }
         const file = '/uploads/image/' + req.file.filename
 

        const event = {
            title : req.body.title,
            date: req.body.date,
            time: req.body.time,
            duration: req.body.duration,
            description: req.body.description,
            venue: req.body.venue,
            file: file,
        }
        const result = await conn.query(`INSERT INTO events SET ?`, event, (err, rows) => {
            if(err) throw err;
            else{
               res.status(200).redirect("events")
            }
        })    } catch (error) {
        
    }
})
router.get('/events', async(req, res) => {
    try {
            conn.query('SELECT * FROM events', (err, result) => {
                if(err) throw err;
                res.status(200).render("events", {data: result})
            })   
          } catch (error) {
        
    }
    
})
router.get('/logout', async(req, res) => {
    try {
        req.session.destroy;
        res.status(200).redirect("/");

    } catch (error) {
        
    }
})


module.exports = router
