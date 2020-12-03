const express = require('express')
const morgan = require('morgan')
const fortuneCookie = require('fortune-cookie')
// const cors = require('cors')





const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

const app = express()

//use morgan to log all request. Use the combined format

app.use(morgan('combined'))

//configure cors


//function to return cookie

const cookies = ()=>{
    const idx = Math.floor(Math.random()*fortuneCookie.length)
    return fortuneCookie[idx]
}

//resources
//GET/api/cookie -> application/ json {cookie: 'cookie text'}
app.get('/api/cookie'/*,cors()*/, (req, resp)=>{
    const n = parseInt(req.query['count']) || 1

    resp.status(200)
    resp.type('application/json')

    if(n==1)
        resp.json({cookie: cookies()})
    else{
        const c =[]
        for (let i=0; i< n; i++)
        c.push({cookie: cookies()})
        resp.json(c)
    }
})


//serve frontend
app.use(express.static(__dirname + '/frontend'))

//start server

app.listen(PORT, ()=>{
    console.info(`Application started on ${PORT} at ${new Date()}`)
})