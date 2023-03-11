const express = require('express');
const app = express();
const mainRouter = require('./routes/mainRouter')
const productsRouter= require ("./routes/productsRouter");
const usersRouter= require ("./routes/userRouter");
const APIRouter= require ("./routes/APIRouter");
const methodOverride =  require('method-override');
const cookies = require('cookie-parser');
const session = require('express-session');
const cors = require('cors')
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
let PORT = 3030;


//--------------------  APP LISTEN ------------------------//
app.listen(PORT, () => console.log("Servidor corriendo en el puerto: " + PORT));

//--------------------  MIDDLEWARE ------------------------//
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookies());
app.use(userLoggedMiddleware);
app.use(cors())


//--------------------  TEMPLATE ENGINE  ------------------------//
app.set('view engine', 'ejs');

app.set( __dirname + "/views/partials");

//--------------------  RUTAS ------------------------//
app.use('/', mainRouter);
app.use("/productos", productsRouter);
app.use("/user", usersRouter);
app.use("/api", APIRouter);

//-------------------NOT FOUND-----------------------------------//
app.get("/*", (req, res) => {
    res.status(404).render('error404');
})

