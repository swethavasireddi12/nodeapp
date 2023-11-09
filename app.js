const express = require("express");
const session = require('express-session');
const flash = require('connect-flash');
//express app
const app = express();

app.use(session({
  secret:'swetha',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());

const port = 3000;
const mongoose = require('mongoose'); //to connect to mongodb

const username  = "swethavasireddi";
const password = "admin@123";
const cluster ="cluster0";
const dbname="NODEJS"
//connect to mongodb and listen to requests
mongoose.connect("mongodb+srv://swethavasireddi:admin%40123@cluster0.o4oyyyo.mongodb.net/NODEJS?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected"));

//register view engine
app.set('view engine', 'ejs');

//middleware and static files
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

//express layouts
var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

//teacher and student routes
const teachRoutes = require("./routes/teacherRoutes")
const studRoutes = require("./routes/studentRoutes")
app.use("/teacher",teachRoutes);
app.use("/student",studRoutes);

//routes
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});