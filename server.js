require('dotenv').config()

const express = require('express')
const app = express()
const routes = require('./router')
const path = require('path')
const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>{
      console.log('Conectado a base de dados.')
      app.emit('pronto')
  })
  .catch(e => console.log(e))
const { middlewarePrimeiro, csrfCheck, csrfMiddleware} = require('./src/middlewares/middlewares')
const sessions = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const helmet = require('helmet')
const csrf = require('csurf')


app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'frontend')))

const sessionOptions = sessions({
    secret: 'mippisnavpas()',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    },
    store: MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING})
})
app.use(sessionOptions)
app.use(flash())

app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

app.use(csrf())
app.use(middlewarePrimeiro)
app.use(csrfCheck)
app.use(csrfMiddleware)

app.use(routes)

app.on('pronto', () =>{
    app.listen(5000, () =>{
        console.log('http://localhost:5000')
    })
})

  

