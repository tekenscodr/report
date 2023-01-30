const express = require('express')
const morgan = require('morgan')
const Routes = require('./routes')
const Dash = require('./dashroutes')
const app = express()
const bodyParser = require("body-parser");
const db = require('./db')
const session = require('express-session')
const { name } = require('ejs')


app.disable('etag');
app.use(session({
	secret: 'wearetheworld',
	resave: true,
	saveUninitialized: true,
    name: ""
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const auth = async(req, res) =>{
    if (!req.session.loggedin) {
        res.status(422).redirect('/login');
    }else{
        console.log(req.session.name)
    }
}
 

app.use("/", Routes, express.static('public'))
app.use("/dash/", Dash, auth, express.static('piblic'))
app.use((err, req, res, next) => {
    res.status(err.status || 404)
    res.send({
        error: {
            status: err.status || 404,
            message: err.message,
        },
    })
})
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    })
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})


