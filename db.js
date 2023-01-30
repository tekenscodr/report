// const db = require('mysql2')

const db = require('mysql')

//  const pool = db.createPool({
//     connectionLimit : 12,
//     host            : 'localhost',
//     user            : "root",
//     password        : "",
//     database        : "report_system",
// }).promise()

// async getReports =>{
//     const [rows] = await pool.query("SELECT * FROM reports")
//     return rows
// }

//  async getOne => {
//     const [rows] = await pool.query(`SELECT FROM reports WHERE id = ? ` [id])
//     return rows[0]
// }

// const addReport = async(title, participants, type, level, district, date, venue, file) => {
//     cosnt [result] = await pool.query(`
//     INSERT INTO reports ()`)
// }

const conn = db.createConnection({
    host            : "localhost",
    user            : "xlentcar_node",
    password        : "Youcannottouchme",
    database        : "xlentcar_report_system",
    port            : "3306"

})

conn.connect((err) => {
    if(err){
        console.log(err.message)
    }
    console.log('db connected')
})
module.exports = conn

