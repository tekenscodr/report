const express = require('express')
const router = express.Router()
const conn = require('./db')
const { pdfupload } = require('./pdfupload')
const { imageupload } = require('./pdfupload')
const path = require('path')
const bcrypt = require('bcryptjs')

// const conn = db.createConnection({
//     host            : 'localhost',
//     user            : "root",
//     password        : "",
//     database        : "report_system",

// })



router.get("/", async(req, res) => {
    try {
    //     const [rows] = await pool.query(`SELECT * FROM reports`)
    //    res.status(200).json(rows)
        res.status(200).render("index")


    } catch (error) {
        res.status(500).send(error)
    }
})
router.get('/login', async(req, res) => {
      try {
        res.status(200).render("login")
    } catch (error) {
        
    }  
})
const session = {}
router.post('/login', async(req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        const report = {
            email, 
            password,
        }
        if(email && password ){
            const result = await conn.query('SELECT * FROM users WHERE email = ? and password = ?', [email, password], (err, rows) =>{
                if(err) res.status(401).send('Invalid!!!');
                if ([rows].length > 0) {
                    // Authenticate the user
                     const name = rows[0].name;
                    req.session.loggedin = true;
                    req.session.name = name;
                    // console.log(rows[0].name)
                    // Redirect to home page
                    res.status(200).redirect("dash");
            	} else {
                    res.status(401).send('Incorrect Username and/or Password!');
                }	
        })        
        }



        // console.log(report)
        // const result = await conn.query('SELECT * FROM accounts WHERE email = ? and password = ?', [report], (err, rows) =>{
        //     if(err)  throw err.sqlMessage;
        //     if (results.length > 0) {
		// 		// Authenticate the user
		// 		req.session.loggedin = true;
		// 		req.session.username = username;
		// 		// Redirect to home page
        //         res.status(200).render("dash", {date: result});
		// 	} else {
		// 		res.send('Incorrect Username and/or Password!');
		// 	}			
            

        // })

  } catch (error) {
      
  }  
})
router.post("/report", pdfupload.single('file'), async(req, res, next) => {
    try {

        if(!req.file){
           console.log("upload file please!!")
        }
        const file = path.join(__dirname) + req.file.filename

        const report = {
            title : req.body.title,
            participants: req.body.participants,
            type: req.body.type,
            level: req.body.level,
            district: req.body.district,
            date: req.body.date,
            venue: req.body.venue,
            file: file,
        }
        const result = await conn.query(`INSERT INTO reports SET ?`, report, (err, rows) => {
            if(err) console.log(err);
            else{
               res.status(200).redirect("/confirm")
            }
        })
        // res.status(200).render("report")
    } catch (error) {
        console.log(error)
        next(error)
    }
})
router.get("/report", async(req, res) => {
    try {
        res.status(200).render("report")
    } catch (error) {
        
    }
})
router.get('/confirm', async(req, res) => {
    try {
        res.status(200).render("confirmed")
    } catch (error) {
        
    }
})

module.exports = router
